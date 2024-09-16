import { useState, useCallback } from 'react';
import {  useBlocker } from 'react-router-dom';

const useNavigationPrompt = (message) => {
  const [isBlocking, setIsBlocking] = useState(false);

  const handleBlockNavigation = useCallback((tx) => {
    if (isBlocking) {
      const confirmLeave = window.confirm(message);
      if (!confirmLeave) {
        tx.retry();
      }
    }
  }, [isBlocking, message]);

  useBlocker(handleBlockNavigation, isBlocking);

  return [isBlocking, setIsBlocking];
};

export default useNavigationPrompt;