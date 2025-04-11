import { useEffect, useState } from 'react';
import ReferralListInstance from '../services/referralList.service';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referralList, setReferralList] = useState([]);

  useEffect(() => {
    const user$ = ReferralListInstance.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setReferralList(state.referralList);
    });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  return {
    error,
    loading,
    referralList,
  };
};

export default useUser;
