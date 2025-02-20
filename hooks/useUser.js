import { useEffect, useState } from 'react';
import UserServiceInstance from '../services/user.service';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const user$ = UserServiceInstance.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setUser(state.user);
      setUserProfile(state.userProfile);
    });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  return {
    error,
    loading,
    user,
    userProfile,
  };
};

export default useUser;
