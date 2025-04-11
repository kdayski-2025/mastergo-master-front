import { Subject } from 'rxjs';
import { GET } from '../api/fetch-api';

class ReferralListService {
  initialState = {
    loading: false,
    error: null,
    referralList: [],
  };

  state = this.initialState;
  state$ = new Subject();

  async get() {
    if (this.state.loading) {
      return;
    }

    this.state = {
      ...this.state,
      loading: true,
    };
    this.state$.next(this.state);

    try {
      const result = await GET('/user/referrals');
      this.state = {
        ...this.state,
        loading: false,
        referralList: result.data,
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

const ReferralListServiceInstance = new ReferralListService();
export default ReferralListServiceInstance;
