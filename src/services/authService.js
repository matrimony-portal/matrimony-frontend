import apiClient, { handleApiError } from "../utils/apiClient.js";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.get("/auth/verify");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await apiClient.post("/auth/refresh", { refreshToken });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
