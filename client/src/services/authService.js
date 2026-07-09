import api from "./api";

export const register = async (userData) => {

  const response = await api.post(
    "/users/register/",
    userData
  );

  return response.data;
};

export const login = async (credentials) => {

  const response = await api.post(
    "/users/login/",
    credentials
  );

  return response.data;
};

export const logout = async () => {

  const response = await api.post(
    "/users/logout/"
  );

  return response.data;
};

export const me = async () => {

  const response = await api.get(
    "/users/me/"
  );

  return response.data;
};

export const refresh = async () => {

  const response = await api.post(
    "/users/refresh/"
  );

  return response.data;
};