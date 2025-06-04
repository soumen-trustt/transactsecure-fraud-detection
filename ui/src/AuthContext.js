import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  let email = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email || decoded.sub || null;
    } catch (e) {
      email = null;
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};
