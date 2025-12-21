import axios from "axios";
import { SYSTEM_MESSAGES } from "../constants/messages.js";
import { apiDelay } from "../utils/apiDelay.js";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    await apiDelay();
    const token = localStorage.getItem("matrimony_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("matrimony_token");
      localStorage.removeItem("matrimony_user");
      localStorage.removeItem("matrimony_userType");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const handleApiError = (error) => {
  if (!navigator.onLine) {
    return SYSTEM_MESSAGES.OFFLINE;
  }

  if (error.code === "ECONNABORTED" || error.message === "Network Error") {
    return SYSTEM_MESSAGES.NETWORK_ERROR;
  }

  return error.response?.data?.message || SYSTEM_MESSAGES.SERVICE_UNAVAILABLE;
};

export default api;
