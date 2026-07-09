import { createContext, useContext, useEffect, useState } from "react";

import * as authService from "../services/authService";

import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [authenticated, setAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await authService.me();

      setUser(data);

      setAuthenticated(true);
    } catch (error) {
      setUser(null);

      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    await authService.login(credentials);

    const data = await authService.me();

    setUser(data);

    setAuthenticated(true);
  };

  const register = async (userData) => {
    await authService.register(userData);

    await login({
      email: userData.email,
      password: userData.password,
    });
  };

  const logout = async () => {
    try {
      await authService.logout();

      toast.success("Sesión cerrada");
    } finally {
      setUser(null);

      setAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loading,

        login,
        register,
        logout,

        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
