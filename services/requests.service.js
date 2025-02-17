import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class RequestsService {
	initialState = {
		loading: false,
		error: null,
		requests: []
	};

	state = this.initialState;
	state$ = new Subject();

	async get() {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.initialState,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const response = await GET('/master/requests');
			this.state = {
				...this.state,
				loading: false,
				requests: response.data,
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

const RequestsServiceInstance = new RequestsService();
export default RequestsServiceInstance;
