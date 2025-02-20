import { simplifyErrorMessage } from '../lib/lib';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-app-type': Constants?.expoConfig?.userType || 'client'
}

const convertToQueryParams = (params = {}) => {
  let queryString = '';
  Object.keys(params).forEach((key, index) => {
    if (index === 0) queryString += `?${key}=${params[key]}`;
    else queryString += `&${key}=${params[key]}`;
  });
  return queryString;
};

const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; // Если токен невалиден или не содержит exp, считаем его истёкшим
  }
  const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
  return decodedToken.exp < currentTime; // Проверяем, истёк ли токен
}


const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers,
      body: JSON.stringify({ refreshToken }),
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    return null;
  }
}

const checkAndRefreshToken = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  const refreshToken = await AsyncStorage.getItem('refresh_token');

  if (!token || !refreshToken) {
    return null;
  }

  if (isTokenExpired(token)) {
    const newToken = await refreshAccessToken(refreshToken);
    if (newToken) {
      await AsyncStorage.setItem('auth_token', newToken);
      return newToken;
    }
    return null;
  }
  return token;
};

export const GET = (endpoint = '', params = {}) => {
  return new Promise(async (resolve, reject) => {
    const token = await checkAndRefreshToken();
    let url = Constants?.expoConfig?.api?.url
    if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
    url += '/api' + endpoint + convertToQueryParams(params);
    const options = {
      method: 'GET',
      headers: {
        ...headers,
        'Authorization': token ? `Bearer ${token}` : ''
      },
    };
    fetch(url, options)
      .then(async (response) => {
        if (response.status === 418 || response.status === 503) {
          const error = new Error(response.status)
          reject(error);
        }
        if (!response.ok) {
          reject(new Error(`${response.statusText || 'FETCH_DATA_ERROR'}\n${url}`));
        }

        const json = await response.json();
        resolve(json);
      })
      .catch((e) => {
        const error = simplifyErrorMessage(e.message);
        reject(new Error(error));
      });
  });
};

export const POST = (endpoint = '', data = {}, customHeaders = null) => {
  return new Promise(async (resolve, reject) => {
    const token = await checkAndRefreshToken();
    let url = Constants?.expoConfig?.api?.url
    if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
    url += '/api' + endpoint;

    const isFormData = data instanceof FormData;
    const body = isFormData ? data : JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        ...headers,
        ...customHeaders,
        'Authorization': `Bearer ${token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' })
      },
      body,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 418 || response.status === 503) {
        const error = new Error(response.status);
        reject(error);
      }
      if (!response.ok) {
        reject(new Error(`${response.statusText || 'POST_DATA_ERROR'}\n${url}\n${JSON.stringify(data)}`));
      }
      const json = await response.json();
      resolve(json);
    } catch (e) {
      const error = simplifyErrorMessage(e.message);
      reject(new Error(error));
    }
  });
};

export const PUT = async (endpoint = '', data = {}) => {
  return new Promise(async (resolve, reject) => {
    const token = await checkAndRefreshToken();
    let url = Constants?.expoConfig?.api?.url
    if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
    url += '/api' + endpoint
    const options = {
      method: 'PUT',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => {
        if (response.status === 418 || response.status === 503) {
          const error = new Error(response.status)
          reject(error);
        }
        resolve(response.json());
      })
      .catch((e) => {
        const error = simplifyErrorMessage(e.message);
        reject(new Error(error));
      });
  });
};
