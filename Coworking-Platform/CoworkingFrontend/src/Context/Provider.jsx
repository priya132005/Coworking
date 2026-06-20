import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Context from './index.js';
import SummaryApi from '../Common/index.js';
import { setUserDetails } from '../Store/UserSlice.js';

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.userDetails.url, {
        method: SummaryApi.userDetails.method,
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        dispatch(setUserDetails(data.user));
        return data.user;
      }

      dispatch(setUserDetails(null));
      return null;
    } catch (err) {
      dispatch(setUserDetails(null));
      return null;
    }
  }, [dispatch]);

  return <Context.Provider value={{ fetchUserDetails }}>{children}</Context.Provider>;
};

export default ContextProvider;
