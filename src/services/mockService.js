// Mock service for development/testing
export const mockAuthService = {
  login: async (email, password, userType) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const credentials = {
      "user@test.com": { password: "User@123", userType: "user" },
      "paid-user@test.com": { password: "User@123", userType: "user" },
      "organizer@test.com": { password: "Org@123", userType: "organizer" },
      "admin@test.com": { password: "Admin@123", userType: "admin" },
    };

    const userCredentials = credentials[email];

    if (
      userCredentials &&
      userCredentials.password === password &&
      userCredentials.userType === userType
    ) {
      return {
        token: "mock-jwt-token-" + Math.random().toString(36).substr(2, 9),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
          userType,
        },
      };
    }

    throw new Error("Invalid credentials");
  },

  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      !userData.email ||
      !userData.password ||
      !userData.firstName ||
      !userData.lastName
    ) {
      throw new Error("All fields are required");
    }

    return {
      user: {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        isVerified: false,
        createdAt: new Date().toISOString(),
      },
    };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { success: true };
  },

  forgotPassword: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { message: "Password reset email sent" };
  },

  resetPassword: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { message: "Password reset successful" };
  },

  verifyToken: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const token = localStorage.getItem("matrimony_token");
    if (!token) throw new Error("No token found");
    return { valid: true };
  },
};
