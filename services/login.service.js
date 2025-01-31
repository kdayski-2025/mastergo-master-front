import { Subject } from 'rxjs';
import { POST } from '../api/fetch-api';

class LoginService {
	initialState = {
		loading: false,
		error: null,
		loginInfo: null,
	};

	state = this.initialState;
	state$ = new Subject();

	async set(body) {
		this.state = {
			loginInfo: { ...this.state.loginInfo, ...body }
		};
		this.state$.next(this.state);
	}

	async register() {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const result = await POST('/auth/register', this.state.loginInfo);
			this.state = {
				...this.state,
				loading: false,
				error: result.error,
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

const LoginServiceInstance = new LoginService();
export default LoginServiceInstance;
