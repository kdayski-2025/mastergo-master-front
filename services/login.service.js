import { BehaviorSubject } from 'rxjs';
import { POST } from '../api/fetch-api';
import UserServiceInstance from './user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginService {
	initialState = {
		loading: false,
		error: null,
		loginInfo: null,
		token: null,
	};

	state = this.initialState;
	state$ = new BehaviorSubject(this.state);

	async set(body) {
		this.state = {
			...this.state,
			loading: false,
			loginInfo: { ...this.state.loginInfo, ...body }
		};
		this.state$.next(this.state);
	}

	async auth(data) {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const result = await POST('/auth/login', data);
			if (result?.data?.user) UserServiceInstance.state$.next({ ...UserServiceInstance.state$, user: result.data.user });
			this.state = {
				...this.state,
				loading: false,
				error: result.error,
				token: result?.data?.token,
			};
			if (result?.data?.token) await AsyncStorage.setItem('auth_token', result.data.token);
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
			if (result?.data?.user) UserServiceInstance.state$.next({ ...UserServiceInstance.state$, user: result.data.user });
			this.state = {
				...this.state,
				loading: false,
				error: result.error,
				token: result?.data?.token,
			};
			if (result?.data?.token) await AsyncStorage.setItem('auth_token', result.data.token);
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

	async edit() {
		if (this.state.loading) {
			return;
		}

		this.state = {
			...this.state,
			loading: true,
		};
		this.state$.next(this.state);

		try {
			const result = await POST('/user/settings', this.state.loginInfo);
			if (result?.data) UserServiceInstance.state$.next({ ...UserServiceInstance.state$, user: result.data });
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
