import { useEffect, useState } from 'react';
import RequestsServiceInstance from '../services/requests.service';

const useRequests = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const request$ = RequestsServiceInstance.state$.subscribe((state) => {
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

export default useRequests;
