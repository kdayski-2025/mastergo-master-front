import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class RequestService {
	initialState = {
		loading: false,
		error: null,
		request: null
	};

	state = this.initialState;
	state$ = new Subject();

	async get(id) {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.initialState,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const request = await GET(`/master/requests/${id}`);
			this.state = {
				...this.state,
				loading: false,
				request,
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
