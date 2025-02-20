import { Subject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class RequestService {
	initialState = {
		loading: false,
		error: null,
		request: null,
		offer: null
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
				request: request.data,
				offer: request.data.offer
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

	async postOffer(id, data) {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const response = await POST(`/master/requests/${id}/offer`, data);
			this.state = {
				...this.state,
				loading: false,
				offer: response.data
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

	async complete(id) {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const response = await POST(`/master/requests/${id}/complete`);
			this.state = {
				...this.state,
				loading: false,
				request: response.data
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
