import { mockDatabase, dbHelpers } from "../data/mockDatabase.js";
import { adminDatabase } from "../data/adminDatabase.js";

// Mock service for development/testing
export const mockAuthService = {
  login: async (email, password) => {
    await dbHelpers.delay();

    // Check in main database first
    let user = dbHelpers.findUserByEmail(email);

    // If not found in main database, check admin database
    if (!user) {
      user = adminDatabase.users.find((u) => u.email === email);
    }

    if (user && user.password === password) {
      return {
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9),
        user: {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          userType: user.role,
          subscriptionStatus: user.subscriptionStatus || null,
          subscriptionTier: user.subscriptionTier || null,
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
      id: dbHelpers.generateId("u"),
      ...userData,
      role: "user",
      subscriptionStatus: "inactive",
      subscriptionTier: "free",
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    mockDatabase.users.push(newUser);

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
