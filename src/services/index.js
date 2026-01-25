// Re-export services
export { userService } from "./userService.js";

// Mock auth service for development
const mockUsers = [
  {
    email: "user@test.com",
    password: "User@123",
    userType: "user",
    name: "Test User",
    id: 1,
    subscriptionStatus: "inactive",
    subscriptionTier: "free",
    subscriptionExpiry: null,
  },
  {
    email: "paid-user@test.com",
    password: "User@123",
    userType: "user",
    name: "Paid User",
    id: 2,
    subscriptionStatus: "active",
    subscriptionTier: "premium",
    // Far future expiry so the test account stays premium in mocks
    subscriptionExpiry: "2035-12-31",
  },
  {
    email: "organizer@test.com",
    password: "Org@123",
    userType: "organizer",
    name: "Event Organizer",
    id: 3,
  },
  {
    email: "admin@test.com",
    password: "Admin@123",
    userType: "admin",
    name: "Test Admin",
    id: 4,
  },
];

export const authService = {
  login: async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      token: "mock-jwt-token",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionTier: user.subscriptionTier,
        subscriptionExpiry: user.subscriptionExpiry,
      },
    };
  },

  register: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

    return {
      user: {
        id: Date.now(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        userType: "user",
      },
    };
  },

  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
