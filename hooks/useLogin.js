import { useEffect, useState } from 'react';
import LoginServiceInstance from '../services/login.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null)

  useEffect(() => {
    const login$ = LoginServiceInstance.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setLoginInfo(state.loginInfo);
      setToken(state.token);
      setRefreshToken(state.refreshToken)
    });

    return () => {
      login$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('auth_token').then((token) => {
      setToken(token);
    });
    AsyncStorage.getItem('refresh_token').then((refreshToken) => {
      setRefreshToken(refreshToken);
    });
  }, []);

  return {
    error,
    loading,
    loginInfo,
    token,
    refreshToken
  };
};

export default useLogin;
