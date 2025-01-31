import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class UserService {
	initialState = {
		loading: false,
		error: null,
		user: null
	};

	state = this.initialState;
	state$ = new Subject();

	async get(body) {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const result = await GET('/user', body);
			this.state = {
				...this.state,
				loading: false,
				error: result.error,
				user: result.user
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

const UserServiceInstance = new UserService();
export default UserServiceInstance;
