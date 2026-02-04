import { mockDatabase, dbHelpers } from "../data/mockDatabase.js";
import { adminDatabase } from "../data/adminDatabase.js";

// Mock service for development/testing
export const mockAuthService = {
  //login: async (email, password, userType) => {
  login: async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user in main database
    let user = mockDatabase?.users?.find((u) => u.email === email);

    // If not found in main database, check admin database
    if (!user && adminDatabase?.users) {
      user = adminDatabase.users.find((u) => u.email === email);
    }

    // Check if user exists and password matches
    if (user && user.password === password) {
      return {
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9),
        user: {
          id: user.id || Math.random().toString(36).substr(2, 9),
          email,
          name: user.name || email.split("@")[0],
          userType: user.userType || user.role || "user",
          subscriptionStatus: user.subscriptionStatus || null,
          subscriptionTier: user.subscriptionTier || null,
          subscriptionExpiry: user.subscriptionExpiry || null,
        },
      };
    }

    throw new Error("Invalid credentials");
  },

  register: async (userData) => {
    await dbHelpers.delay(1000);

    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      throw new Error("All fields are required");
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      userType: "user",
      subscriptionStatus: "inactive",
      subscriptionTier: "free",
      subscriptionExpiry: null,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    if (mockDatabase?.users) {
      mockDatabase.users.push(newUser);
    }

    return { user: newUser };
  },

  logout: async () => {
    await dbHelpers.delay(200);
    return { success: true };
  },

  forgotPassword: async () => {
    await dbHelpers.delay();
    return { message: "Password reset email sent" };
  },

  resetPassword: async () => {
    await dbHelpers.delay();
    return { message: "Password reset successful" };
  },

  verifyToken: async () => {
    await dbHelpers.delay(200);
    const token = localStorage.getItem("matrimony_token");
    if (!token) throw new Error("No token found");
    return { valid: true };
  },
};
