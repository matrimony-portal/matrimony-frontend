import {
  users,
  profiles,
  subscriptions,
  organizers,
  events,
  successStories,
  reports,
} from "./entities/data.js";

export const database = {
  users,
  profiles,
  subscriptions,
  organizers,
  events,
  successStories,
  reports,
};

export const dbHelpers = {
  findUserByEmail: (email) => users.find((u) => u.email === email),
  findUserById: (id) => users.find((u) => u.id === id),
  findUsersByRole: (role) => users.filter((u) => u.role === role),
  findProfileByUserId: (userId) => profiles.find((p) => p.userId === userId),
  findActiveSubscription: (userId) =>
    subscriptions.find((s) => s.userId === userId && s.status === "active"),
  generateId: (prefix = "id") =>
    `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
  delay: (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms)),
};

export const getStats = () => ({
  totalUsers: users.filter((u) => u.role === "user").length,
  activeUsers: users.filter((u) => u.role === "user" && u.status === "active")
    .length,
  premiumUsers: subscriptions.filter(
    (s) => s.tier === "premium" && s.status === "active",
  ).length,
  activeOrganizers: users.filter(
    (u) => u.role === "organizer" && u.status === "active",
  ).length,
  totalEvents: events.length,
  pendingReports: reports.filter((r) => r.status === "pending").length,
});
