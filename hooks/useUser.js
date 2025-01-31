import { useEffect, useState } from 'react';
import UserServiceInstance from '../services/user.service';

const useUser = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const user$ = UserServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setUser(state.user);
		});

		return () => {
			user$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		user,
	};
};

export default useUser;
