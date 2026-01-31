import { createContext, useEffect, useState } from "react";
import SummaryApi from "../Common";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(SummaryApi.userDetails.url, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
