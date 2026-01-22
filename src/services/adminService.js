import api from "./api.js";
import { mockAdminServices } from "./mockAdminServices.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const adminService = {
  // Dashboard & Analytics
  getDashboardStats: async () => {
    if (USE_MOCK) {
      return await mockAdminServices.getDashboardStats();
    }
    const response = await api.get("/admin/dashboard/stats");
    return response.data;
  },

  getAnalytics: async (period = "30d") => {
    if (USE_MOCK) {
      return await mockAdminServices.getAnalytics(period);
    }
    const response = await api.get("/admin/analytics", { params: { period } });
    return response.data;
  },

  getRecentActivities: async (limit = 10) => {
    if (USE_MOCK) {
      return await mockAdminServices.getRecentActivities(limit);
    }
    const response = await api.get("/admin/activities/recent", {
      params: { limit },
    });
    return response.data;
  },

  // User Management
  getAllUsers: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockAdminServices.getAllUsers(filters);
    }
    const response = await api.get("/admin/users", { params: filters });
    return response.data;
  },

  getUserById: async (userId) => {
    if (USE_MOCK) {
      return await mockAdminServices.getUserById(userId);
    }
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUserStatus: async (userId, status) => {
    if (USE_MOCK) {
      return await mockAdminServices.updateUserStatus(userId, status);
    }
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  deleteUser: async (userId) => {
    if (USE_MOCK) {
      return await mockAdminServices.deleteUser(userId);
    }
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Organizer Management
  getAllOrganizers: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockAdminServices.getAllOrganizers(filters);
    }
    const response = await api.get("/admin/organizers", { params: filters });
    return response.data;
  },

  getOrganizerById: async (organizerId) => {
    if (USE_MOCK) {
      return await mockAdminServices.getOrganizerById(organizerId);
    }
    const response = await api.get(`/admin/organizers/${organizerId}`);
    return response.data;
  },

  createOrganizer: async (organizerData) => {
    if (USE_MOCK) {
      return await mockAdminServices.createOrganizer(organizerData);
    }
    const response = await api.post("/admin/organizers", organizerData);
    return response.data;
  },

  updateOrganizer: async (organizerId, organizerData) => {
    if (USE_MOCK) {
      return await mockAdminServices.updateOrganizer(
        organizerId,
        organizerData,
      );
    }
    const response = await api.put(
      `/admin/organizers/${organizerId}`,
      organizerData,
    );
    return response.data;
  },

  deleteOrganizer: async (organizerId) => {
    if (USE_MOCK) {
      return await mockAdminServices.deleteOrganizer(organizerId);
    }
    const response = await api.delete(`/admin/organizers/${organizerId}`);
    return response.data;
  },

  // Success Stories Management
  getAllSuccessStories: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockAdminServices.getAllSuccessStories(filters);
    }
    const response = await api.get("/admin/success-stories", {
      params: filters,
    });
    return response.data;
  },

  getSuccessStoryById: async (storyId) => {
    if (USE_MOCK) {
      return await mockAdminServices.getSuccessStoryById(storyId);
    }
    const response = await api.get(`/admin/success-stories/${storyId}`);
    return response.data;
  },

  createSuccessStory: async (storyData) => {
    if (USE_MOCK) {
      return await mockAdminServices.createSuccessStory(storyData);
    }
    const response = await api.post("/admin/success-stories", storyData);
    return response.data;
  },

  updateSuccessStory: async (storyId, storyData) => {
    if (USE_MOCK) {
      return await mockAdminServices.updateSuccessStory(storyId, storyData);
    }
    const response = await api.put(
      `/admin/success-stories/${storyId}`,
      storyData,
    );
    return response.data;
  },

  deleteSuccessStory: async (storyId) => {
    if (USE_MOCK) {
      return await mockAdminServices.deleteSuccessStory(storyId);
    }
    const response = await api.delete(`/admin/success-stories/${storyId}`);
    return response.data;
  },

  // Reports Management
  getAllReports: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockAdminServices.getAllReports(filters);
    }
    const response = await api.get("/admin/reports", { params: filters });
    return response.data;
  },

  getReportById: async (reportId) => {
    if (USE_MOCK) {
      return await mockAdminServices.getReportById(reportId);
    }
    const response = await api.get(`/admin/reports/${reportId}`);
    return response.data;
  },

  updateReportStatus: async (
    reportId,
    status,
    adminNotes = "",
    actionTaken = null,
  ) => {
    if (USE_MOCK) {
      return await mockAdminServices.updateReportStatus(
        reportId,
        status,
        adminNotes,
        actionTaken,
      );
    }
    const response = await api.put(`/admin/reports/${reportId}`, {
      status,
      adminNotes,
      actionTaken,
    });
    return response.data;
  },

  // Complaints Management
  getAllComplaints: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockAdminServices.getAllComplaints(filters);
    }
    const response = await api.get("/admin/complaints", { params: filters });
    return response.data;
  },

  getComplaintById: async (complaintId) => {
    if (USE_MOCK) {
      return await mockAdminServices.getComplaintById(complaintId);
    }
    const response = await api.get(`/admin/complaints/${complaintId}`);
    return response.data;
  },

  updateComplaintStatus: async (
    complaintId,
    status,
    resolution = "",
    adminNotes = "",
  ) => {
    if (USE_MOCK) {
      return await mockAdminServices.updateComplaintStatus(
        complaintId,
        status,
        resolution,
        adminNotes,
      );
    }
    const response = await api.put(`/admin/complaints/${complaintId}`, {
      status,
      resolution,
      adminNotes,
    });
    return response.data;
  },
};
