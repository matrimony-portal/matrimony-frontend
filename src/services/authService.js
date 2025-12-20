import api from "./api.js";
import { mockAuthService } from "./mockService.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const authService = {
  login: async (email, password, userType) => {
    if (USE_MOCK) {
      return await mockAuthService.login(email, password, userType);
    }
    const response = await api.post("/auth/login", {
      email,
      password,
      userType,
    });
    return response.data;
  },

  register: async (userData) => {
    if (USE_MOCK) {
      return await mockAuthService.register(userData);
    }
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    if (USE_MOCK) {
      return await mockAuthService.logout();
    }
    const response = await api.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (email) => {
    if (USE_MOCK) {
      return await mockAuthService.forgotPassword(email);
    }
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    if (USE_MOCK) {
      return await mockAuthService.resetPassword(token, newPassword);
    }
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  verifyToken: async () => {
    if (USE_MOCK) {
      return await mockAuthService.verifyToken();
    }
    const response = await api.get("/auth/verify");
    return response.data;
  },
};
