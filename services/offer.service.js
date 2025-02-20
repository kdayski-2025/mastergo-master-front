import { Subject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class OfferService {
	initialState = {
		loading: false,
		error: null,
		offer: null
	};

	state = this.initialState;
	state$ = new Subject();

	// async post(id, data) {
	// 	if (this.state.loading) {
	// 		return;
	// 	}

	// 	this.state = {
	// 		...this.initialState,
	// 		loading: true,
	// 	};
	// 	this.state$.next(this.state);

	// 	try {
	// 		const response = await POST(`/master/requests/${id}/offer`, data);
	// 		this.state = {
	// 			...this.state,
	// 			loading: false,
	// 			offer: response.data
	// 		};

	// 		this.state$.next(this.state);
	// 	} catch (error) {
	// 		this.state = {
	// 			...this.state,
	// 			loading: false,
	// 			error: error.message,
	// 		};
	// 		this.state$.next(this.state);
	// 		throw new Error(error.message);
	// 	}
	// }
}

const OfferServiceInstance = new OfferService();
export default OfferServiceInstance;
