import { useEffect, useState } from 'react';
import LoginServiceInstance from '../services/login.service';

const useLogin = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [loginInfo, setLoginInfo] = useState(null);

	useEffect(() => {
		const user$ = LoginServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setLoginInfo(state.loginInfo);
		});

		return () => {
			user$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		loginInfo,
	};
};

export default useLogin;
