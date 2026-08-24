// // src/context/AuthContext.jsx
// import { createContext, useState, useContext, useEffect } from 'react';
// import { mockApi } from '../utils/mockApi';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const response = await mockApi.login(email, password);
//     setToken(response.token);
//     setUser(response.user);
//     localStorage.setItem('token', response.token);
//     localStorage.setItem('user', JSON.stringify(response.user));
//     return response;
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };

//   const value = { user, token, loading, login, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };