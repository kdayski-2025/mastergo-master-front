import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class CategoryService {
	initialState = {
		loading: false,
		error: null,
		categories: []
	};

	state = this.initialState;
	state$ = new Subject();

	async get() {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const result = await GET('/masterTypes');
			this.state = {
				...this.state,
				loading: false,
				categories: result.data,
			};
			this.state$.next(this.state);
		} catch (error) {
			this.state = {
				...this.state,
				loading: false,
				error: error.message,
			};
			this.state$.next(this.state);
			throw new Error(error.message);
		}
	}
}

const CategoryServiceInstance = new CategoryService();
export default CategoryServiceInstance;
