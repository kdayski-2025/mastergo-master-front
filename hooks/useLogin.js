import { useEffect, useState } from 'react';
import LoginServiceInstance from '../services/login.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLogin = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [loginInfo, setLoginInfo] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const login$ = LoginServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setLoginInfo(state.loginInfo);
			setToken(state.token);
		});

		return () => {
			login$.unsubscribe();
		};
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('auth_token').then((token) => {
			setToken(token);
		});
	}, []);

	return {
		error,
		loading,
		loginInfo,
		token,
	};
};

export default useLogin;
