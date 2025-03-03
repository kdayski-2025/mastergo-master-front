import { BehaviorSubject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class UserService {
  initialState = {
    loading: false,
    error: null,
    userProfile: null,
  };

  state$ = new BehaviorSubject(this.initialState);

  async getProfile(id) {
    if (this.state$.value.loading) {
      return;
    }

    this.state$.next({
      ...this.state$.value,
      loading: true,
    });

    try {
      const result = await GET(`/user/profile${id ? `/${id}` : ''}`);
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
}

const UserServiceInstance = new UserService();
export default UserServiceInstance;
