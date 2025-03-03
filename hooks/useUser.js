import { useEffect, useState } from 'react';
import UserServiceInstance from '../services/user.service';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user$ = UserServiceInstance.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setUserProfile(state.userProfile);
    });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  return {
    error,
    loading,
    userProfile,
  };
};

export default useUser;
