import { createContext, useEffect, useState } from "react";
import SummaryApi from "../Common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/UserSlice";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      dispatch(setUserDetails(JSON.parse(storedUser)));
    }
    setLoading(false);
  }, [dispatch]);

  // 🔐 LOGIN
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    dispatch(setUserDetails(userData));
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await fetch(SummaryApi.signOut?.url || "/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout API failed (safe to ignore)");
    }

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUserDetails(null));
  };

  // 👤 FETCH USER (for protected pages)
  const fetchUserDetails = async () => {
    try {
      const res = await fetch(SummaryApi.userDetails.url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);
        dispatch(setUserDetails(data.data));
        localStorage.setItem("user", JSON.stringify(data.data));
      }
    } catch (err) {
      console.error("fetchUserDetails failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        fetchUserDetails,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
