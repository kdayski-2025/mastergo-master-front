import { useEffect, useState } from 'react';
import LoginServiceInstance from '../services/login.service';

const useLogin = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [loginInfo, setLoginInfo] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const user$ = LoginServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setLoginInfo(state.loginInfo);
			setToken(state.token);
		});

		return () => {
			user$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		loginInfo,
		token,
	};
};

export default useLogin;
