import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class RequestService {
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
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const requests = await GET('/requests');
			this.state = {
				...this.state,
				loading: false,
				requests,
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

const RequestServiceInstance = new RequestService();
export default RequestServiceInstance;
