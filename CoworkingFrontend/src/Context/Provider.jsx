// import React, { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import Context from './index.js';
// import SummaryApi from '../Common/index.js';
// import { setUserDetails } from '../Store/UserSlice.js';

// export const ContextProvider = ({ children }) => {
//   const dispatch = useDispatch();

//   const fetchUserDetails = useCallback(async () => {
//     try {
//       const response = await fetch(SummaryApi.userDetails.url, {
//         method: SummaryApi.userDetails.method,
//         credentials: 'include',
//       });
//       const data = await response.json();

//       if (data.success) {
//         dispatch(setUserDetails(data.user));
//         return data.user;
//       }

//       dispatch(setUserDetails(null));
//       return null;
//     } catch (err) {
//       dispatch(setUserDetails(null));
//       return null;
//     }
//   }, [dispatch]);

//   return <Context.Provider value={{ fetchUserDetails }}>{children}</Context.Provider>;
// };

// export default ContextProvider;


import { useEffect, useState } from "react";

const useHeaderColor = () => {
const [headerColor, setHeaderColor] = useState(false)
  //to handle shadow of header
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("#FFB6C1")
      } else {
        setHeaderColor("none");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor
};

export default useHeaderColor;