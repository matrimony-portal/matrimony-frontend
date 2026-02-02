import axios from "axios";
import { SYSTEM_MESSAGES } from "../constants/messages.js";
import { apiDelay } from "../utils/apiDelay.js";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/bandhan";

// ============================================
// Regular API Instance (for all except admin)
// ============================================
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor for regular API
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

// Response interceptor for regular API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect when only my-registrations fails (e.g. expired token); events list can still show
      const url = error.config?.url ?? error.config?.baseURL ?? "";
      if (String(url).includes("my-registrations")) {
        return Promise.reject(error);
      }
      localStorage.removeItem("matrimony_token");
      localStorage.removeItem("matrimony_refresh_token");
      localStorage.removeItem("matrimony_user");
      localStorage.removeItem("matrimony_userType");
      localStorage.removeItem("matrimony_subscriptionStatus");
      localStorage.removeItem("matrimony_subscriptionTier");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ============================================
// Admin API Instance (separate instance)
// ============================================
const adminApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Request interceptor for admin API
adminApi.interceptors.request.use(
  async (config) => {
    await apiDelay();
    const token = localStorage.getItem("matrimony_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add admin-specific headers if needed
    config.headers["X-Admin-Request"] = "true";
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for admin API
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("matrimony_token");
      localStorage.removeItem("matrimony_user");
      localStorage.removeItem("matrimony_userType");
      window.location.href = "/login";
    }
    // Admin-specific error handling can be added here
    if (error.response?.status === 403) {
      // Forbidden - not an admin
      console.error("Admin access denied");
    }
    return Promise.reject(error);
  },
);

// ============================================
// Error Handler Utility
// ============================================
export const handleApiError = (error) => {
  if (!navigator.onLine) {
    return SYSTEM_MESSAGES.OFFLINE;
  }

  if (error.code === "ECONNABORTED" || error.message === "Network Error") {
    return SYSTEM_MESSAGES.NETWORK_ERROR;
  }

  // Handle structured error responses from backend
  if (error.response?.data) {
    const errorData = error.response.data;

    // Check for validation errors
    if (errorData.validationErrors) {
      const firstError = Object.values(errorData.validationErrors)[0];
      return (
        firstError || errorData.message || SYSTEM_MESSAGES.SERVICE_UNAVAILABLE
      );
    }

    // Check for error message
    if (errorData.message) {
      return errorData.message;
    }

    // Check for error code
    if (errorData.code === "PREMIUM_REQUIRED") {
      return "This feature requires a premium subscription";
    }
  }

  return error.response?.data?.message || SYSTEM_MESSAGES.SERVICE_UNAVAILABLE;
};

// Export both instances
export default api;
export { adminApi };
