import { useEffect, useState } from 'react';
import OtherUserInstance from '../services/otherUser.service';

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherUserProfile, setOtherUserProfile] = useState(null);

  useEffect(() => {
    const user$ = OtherUserInstance.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setOtherUserProfile(state.otherUserProfile);
    });

    return () => {
      user$.unsubscribe();
    };
  }, []);

  return {
    error,
    loading,
    otherUserProfile,
  };
};

export default useUser;
