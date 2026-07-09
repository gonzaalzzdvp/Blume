import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

const excludedRoutes = [
  "/users/login/",
  "/users/register/",
  "/users/refresh/",
  "/users/me/",
];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const shouldSkipRefresh = excludedRoutes.some((route) =>
      originalRequest.url.includes(route),
    );

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/users/refresh/");

        processQueue();

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;