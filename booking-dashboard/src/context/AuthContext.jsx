import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hli_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('hli_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate session on mount if token exists
    if (token) {
      authApi
        .getProfile()
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('hli_user', JSON.stringify(res.data));
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    const { access, user: userData } = res.data;
    setToken(access);
    setUser(userData);
    localStorage.setItem('hli_token', access);
    localStorage.setItem('hli_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('hli_token');
    localStorage.removeItem('hli_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
