import { useEffect, useState } from 'react';
import RequestServiceInstance from '../services/request.service';

const useRequest = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [request, setRequest] = useState(null);
	const [offer, setOffer] = useState(null);

	useEffect(() => {
		const request$ = RequestServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setRequest(state.request);
			setOffer(state.offer)
		});

		return () => {
			request$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		request,
		offer
	};
};

export default useRequest;
