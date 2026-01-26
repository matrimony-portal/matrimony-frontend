import { adminApi } from "./api.js";

/**
 * Admin Service
 * Uses separate adminApi instance
 * All admin endpoints should use this service
 */
export const adminService = {
  // User Management
  getAllUsers: async (filters = {}) => {
    const response = await adminApi.get("/admin/users", { params: filters });
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await adminApi.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await adminApi.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await adminApi.delete(`/admin/users/${userId}`);
    return response.data;
  },

  blockUser: async (userId, reason) => {
    const response = await adminApi.post(`/admin/users/${userId}/block`, {
      reason,
    });
    return response.data;
  },

  unblockUser: async (userId) => {
    const response = await adminApi.post(`/admin/users/${userId}/unblock`);
    return response.data;
  },

  verifyProfile: async (userId) => {
    const response = await adminApi.post(`/admin/users/${userId}/verify`);
    return response.data;
  },

  // Event Organizer Management
  getAllOrganizers: async () => {
    const response = await adminApi.get("/admin/organizers");
    return response.data;
  },

  approveOrganizer: async (organizerId) => {
    const response = await adminApi.post(
      `/admin/organizers/${organizerId}/approve`,
    );
    return response.data;
  },

  rejectOrganizer: async (organizerId, reason) => {
    const response = await adminApi.post(
      `/admin/organizers/${organizerId}/reject`,
      { reason },
    );
    return response.data;
  },

  // Reports Management
  getAllReports: async (filters = {}) => {
    const response = await adminApi.get("/admin/reports", { params: filters });
    return response.data;
  },

  getReportById: async (reportId) => {
    const response = await adminApi.get(`/admin/reports/${reportId}`);
    return response.data;
  },

  resolveReport: async (reportId, resolution) => {
    const response = await adminApi.put(`/admin/reports/${reportId}/resolve`, {
      resolution,
    });
    return response.data;
  },

  // Success Stories
  getAllSuccessStories: async (filters = {}) => {
    const response = await adminApi.get("/admin/success-stories", {
      params: filters,
    });
    return response.data;
  },

  approveSuccessStory: async (storyId) => {
    const response = await adminApi.post(
      `/admin/success-stories/${storyId}/approve`,
    );
    return response.data;
  },

  rejectSuccessStory: async (storyId, reason) => {
    const response = await adminApi.post(
      `/admin/success-stories/${storyId}/reject`,
      { reason },
    );
    return response.data;
  },

  // Analytics/Dashboard
  getDashboardStats: async () => {
    const response = await adminApi.get("/admin/dashboard/stats");
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await adminApi.get("/admin/dashboard/activity");
    return response.data;
  },
};
