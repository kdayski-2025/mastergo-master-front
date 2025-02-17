import { useEffect, useState } from 'react';
import CategoryServiceInstance from '../services/category.service';

const useCategory = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const category$ = CategoryServiceInstance.state$.subscribe((state) => {
			setLoading(state.loading);
			setError(state.error);
			setCategories(state.categories);
		});

		return () => {
			category$.unsubscribe();
		};
	}, []);

	return {
		error,
		loading,
		categories,
	};
};

export default useCategory;
