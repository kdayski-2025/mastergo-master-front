import { BehaviorSubject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class UserService {
  initialState = {
    loading: false,
    error: null,
    user: null,
    userProfile: null,
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
        user: result.data,
      });
    } catch (error) {
      this.state$.next({
        loading: false,
        error: error.message,
        user: null,
      });
      throw new Error(error.message);
    }
  }

  async getProfile() {
    if (this.state$.value.loading) {
      return;
    }

    this.state$.next({
      ...this.initialState,
      loading: true,
    });

    try {
      const result = await GET(`/user/profile`);
      this.state$.next({
        loading: false,
        error: result.error,
        userProfile: result.data,
      });
    } catch (error) {
      this.state$.next({
        loading: false,
        error: error.message,
        userProfile: null,
      });
      throw new Error(error.message);
    }
  }
  async sendFeedback(data) {
    if (this.state$.value.loading) {
      return;
    }

    this.state$.next({
      ...this.state$.value,
      loading: true,
    });

    try {
      await POST('/user/rewiews', data);
      this.state$.next({
        ...this.state$.value,
        loading: false,
      });
    } catch (error) {
      this.state$.next({
        ...this.state$.value,
        loading: false,
        error: error.message,
      });
      throw new Error(error.message);
    }
  }
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
