import { BehaviorSubject } from 'rxjs';
import { GET } from '../api/fetch-api';

class UserService {
	initialState = {
		loading: false,
		error: null,
		user: null
	};

	state$ = new BehaviorSubject(this.initialState);

	async get(body) {
		if (this.state$.value.loading) {
			return;
		}

		this.state$.next({
			...this.initialState,
			loading: true,
		});

		try {
			const result = await GET('/user', body);
			this.state$.next({
				loading: false,
				error: result.error,
				user: result.user
			});
		} catch (error) {
			this.state$.next({
				loading: false,
				error: error.message,
				user: null
			});
			throw new Error(error.message);
		}
	}
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
