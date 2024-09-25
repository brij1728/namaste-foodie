import React, { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  const handleOffline = () => setOnlineStatus(false);
  const handleOnline = () => setOnlineStatus(true);

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return onlineStatus;
};
