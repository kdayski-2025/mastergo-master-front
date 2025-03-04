import { BehaviorSubject } from 'rxjs';
import { GET, POST } from '../api/fetch-api';

class OtherUserService {
  initialState = {
    loading: false,
    error: null,
    otherUserProfile: null,
  };

  state$ = new BehaviorSubject(this.initialState);

  async getOtherUserProfile(id) {
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
        otherUserProfile: result.data,
      });
    } catch (error) {
      this.state$.next({
        loading: false,
        error: error.message,
        otherUserProfile: null,
      });
      throw new Error(error.message);
    }
  }
}

const OtherUserInstance = new OtherUserService();
export default OtherUserInstance;
