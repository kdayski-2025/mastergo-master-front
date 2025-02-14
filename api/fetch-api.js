import { simplifyErrorMessage } from '../lib/lib';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const convertToQueryParams = (params = {}) => {
	let queryString = '';
	Object.keys(params).forEach((key, index) => {
		if (index === 0) queryString += `?${key}=${params[key]}`;
		else queryString += `&${key}=${params[key]}`;
	});
	return queryString;
};

const getAuthToken = async () => {
	try {
		const token = await AsyncStorage.getItem('auth_token');
		return token;
	} catch (e) {
		console.error('Failed to fetch the token from storage', e);
		return null;
	}
};

export const GET = (endpoint = '', params = {}) => {
	return new Promise(async (resolve, reject) => {
		const token = await getAuthToken();
		let url = Constants?.expoConfig?.api?.url
		if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
		url += '/api' + endpoint + convertToQueryParams(params);
		const options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'App-Version': Constants?.expoConfig?.userType || 'client',
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

export const POST = (endpoint = '', data = {}) => {
	return new Promise(async (resolve, reject) => {
		const token = await getAuthToken();
		let url = Constants?.expoConfig?.api?.url
		if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
		url += '/api' + endpoint
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'App-Version': Constants?.expoConfig?.userType || 'client',
				'Authorization': token ? `Bearer ${token}` : ''
			},
			body: JSON.stringify(data),
		};

		fetch(url, options)
			.then((response) => {
				if (response.status === 418 || response.status === 503) {
					const error = new Error(response.status)
					reject(error);
				}
				if (!response.ok) {
					reject(new Error(`${response.statusText || 'POST_DATA_ERROR'}\n${url}\n${JSON.stringify(data)}`));
				}

				resolve(response.json());
			})
			.catch((e) => {
				const error = simplifyErrorMessage(e.message);
				console.log(error);
				reject(new Error(error));
			});
	});
};

export const PUT = async (endpoint = '', data = {}) => {
	return new Promise(async (resolve, reject) => {
		const token = await getAuthToken();
		let url = Constants?.expoConfig?.api?.url
		if (Constants?.expoConfig?.api?.port) url += `:${Constants?.expoConfig?.api?.port}`
		url += '/api' + endpoint
		const options = {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'App-Version': Constants?.expoConfig?.userType || 'client',
				'Authorization': token ? `Bearer ${token}` : ''
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
