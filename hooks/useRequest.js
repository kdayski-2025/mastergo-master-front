import { useEffect, useState } from 'react';
import RequestServiceInstance from '../services/request.service';

const useRequest = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const request$ = RequestServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setRequests(state.requests);
		});

		return () => {
			request$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		requests,
	};
};

export default useRequest;
