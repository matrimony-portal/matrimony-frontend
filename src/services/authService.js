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

  // Step 1: Start registration - send verification email
  startRegistration: async (email) => {
    try {
      const response = await apiClient.post("/auth/start-registration", {
        email,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Step 2: Verify email token
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.post("/auth/verify-email", { token });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Step 3: Complete registration with user data
  completeRegistration: async (token, userData) => {
    try {
      const response = await apiClient.post(
        "/auth/complete-registration",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

  verifyResetToken: async (token) => {
    try {
      const response = await apiClient.post("/auth/verify-reset-token", {
        token,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post(
        "/auth/reset-password",
        { newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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
