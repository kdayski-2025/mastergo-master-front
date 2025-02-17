import { useEffect, useState } from 'react';
import CitiesServiceInstance from '../services/cities.service';

const useCities = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		const category$ = CitiesServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setCities(state.cities);
		});

		return () => {
			category$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		cities,
	};
};

export default useCities;
