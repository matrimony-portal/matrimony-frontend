import { database, dbHelpers, getStats } from "../data/index.js";

export const mockAdminServices = {
  getDashboardStats: async () => {
    await dbHelpers.delay();
    return getStats();
  },

  getAllUsers: async () => {
    await dbHelpers.delay();
    return database.users
      .filter((u) => u.role === "user")
      .map((user) => {
        const profile = dbHelpers.findProfileByUserId(user.id);
        const subscription = dbHelpers.findActiveSubscription(user.id);
        return {
          ...user,
          subscriptionTier: subscription?.tier || "free",
          city: profile?.city || "",
          phone: user.phone || "",
        };
      });
  },

  updateUserStatus: async (id, status) => {
    await dbHelpers.delay();
    const user = database.users.find((u) => u.id === id);
    if (user) user.status = status;
    return user;
  },
};
