import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class CitiesService {
	initialState = {
		loading: false,
		error: null,
		cities: []
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
			const result = await GET('/cities');
			this.state = {
				...this.state,
				loading: false,
				cities: result,
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

const CitiesServiceInstance = new CitiesService();
export default CitiesServiceInstance;
