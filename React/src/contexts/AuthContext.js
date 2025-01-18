// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);  // track user role (admin or user)

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

    setIsAuthenticated(isLoggedIn);
    setRole(userRole);
  }, []);

  const login = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);  // Store the user's role
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
