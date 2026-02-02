import api from "./api.js";
import { mockAuthService } from "./mockService.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

/**
 * Map backend role to frontend userType
 */
const mapRoleToUserType = (role) => {
  const roleMap = {
    ADMIN: "admin",
    EVENT_ORGANIZER: "organizer",
    USER: "user",
  };
  return roleMap[role] || "user";
};

/**
 * Normalize backend ApiResponse<AuthResponse> to frontend format.
 * Uses planType (FREE/PREMIUM) as subscriptionTier.
 */
const normalizeAuthResponse = (apiResponse) => {
  const authData = apiResponse.data; // AuthResponse: token, refreshToken, expiresIn, user
  if (!authData || !authData.user) {
    throw new Error("Invalid auth response");
  }
  const tier = (authData.user.planType || "FREE").toLowerCase();

  return {
    token: authData.token,
    refreshToken: authData.refreshToken,
    expiresIn: authData.expiresIn,
    user: {
      id: authData.user.id,
      email: authData.user.email,
      name: `${authData.user.firstName || ""} ${authData.user.lastName || ""}`.trim(),
      userType: mapRoleToUserType(authData.user.role),
      subscriptionStatus: "active",
      subscriptionTier: tier,
      subscriptionExpiry: authData.user.subscriptionExpiry || null,
    },
  };
};

export const authService = {
  login: async (email, password, userType) => {
    if (USE_MOCK) {
      return await mockAuthService.login(email, password, userType);
    }
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return normalizeAuthResponse(response.data);
  },

  register: async (userData) => {
    if (USE_MOCK) {
      return await mockAuthService.register(userData);
    }
    const response = await api.post("/auth/register", userData);
    const res = response.data;
    const data = res?.data ?? res;
    return data;
  },

  logout: async () => {
    if (USE_MOCK) {
      return await mockAuthService.logout();
    }
    const refreshToken =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("matrimony_refresh_token")
        : null;
    await api.post("/auth/logout", { refreshToken: refreshToken || "" });
    return { success: true };
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
