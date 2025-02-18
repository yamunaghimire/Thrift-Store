// // import React, { createContext, useState, useContext, useEffect } from 'react';

// // const AuthContext = createContext();

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState(null);  // Store full user object including role
// //   const [token, setToken] = useState(null);

// //   // Load user data from localStorage on mount
// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem('user'));
// //     const storedToken = localStorage.getItem('token');
// //     const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

// //     if (isLoggedIn && storedUser && storedToken) {
// //       setIsAuthenticated(true);
// //       setUser(storedUser);
// //       setToken(storedToken);
// //     }
// //   }, []);

// //   // Login function
// //   const login = (userData, authToken) => {
// //     setIsAuthenticated(true);
// //     setUser(userData);
// //     setToken(authToken);

// //     localStorage.setItem('isAuthenticated', 'true');
// //     localStorage.setItem('user', JSON.stringify(userData));  // Store full user object
// //     localStorage.setItem('token', authToken);  // Store token separately
// //   };

// //   // Logout function
// //   const logout = () => {
// //     setIsAuthenticated(false);
// //     setUser(null);
// //     setToken(null);

// //     localStorage.removeItem('isAuthenticated');
// //     localStorage.removeItem('user');
// //     localStorage.removeItem('token');
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);  // Store full user object including role
//   const [token, setToken] = useState(null);

//   // Load user data from localStorage on mount
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user'));
//     const storedToken = localStorage.getItem('token');
//     const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

//     // Only set state if values are different to prevent unnecessary updates
//     if (isLoggedIn && storedUser && storedToken) {
//       if (!isAuthenticated) setIsAuthenticated(true);
//       if (!user) setUser(storedUser);
//       if (!token) setToken(storedToken);
//     } else {
//       // If user is logged out, clear the state
//       setIsAuthenticated(false);
//       setUser(null);
//       setToken(null);
//     }
//   }, []); // Empty dependency array ensures this runs only once when the component mounts

//   // Login function
//   const login = (userData, authToken) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     setToken(authToken);

//     localStorage.setItem('isAuthenticated', 'true');
//     localStorage.setItem('user', JSON.stringify(userData));  // Store full user object
//     localStorage.setItem('token', authToken);  // Store token separately
//   };

//   // Logout function
//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     setToken(null);

//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Initialize state using lazy initialization (avoiding unnecessary re-renders)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  // Login function
  const login = (userData, authToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(authToken);

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Memoize context value to prevent unnecessary re-renders
  const authContextValue = useMemo(
    () => ({ isAuthenticated, user, token, login, logout }),
    [isAuthenticated, user, token]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
