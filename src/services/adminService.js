import api from "./api.js";

export const adminService = {
  getAllUsers: async (filters = {}) => {
    const response = await api.get("/admin/users", { params: filters });
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUserStatus: async (userId, status) => {
    const response = await api.put(`/admin/users/${userId}/status`, { status });
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  getAllOrganizers: async () => {
    const response = await api.get("/admin/organizers");
    return response.data;
  },

  createOrganizer: async (organizerData) => {
    const response = await api.post("/admin/organizers", organizerData);
    return response.data;
  },

  updateOrganizer: async (organizerId, organizerData) => {
    const response = await api.put(
      `/admin/organizers/${organizerId}`,
      organizerData,
    );
    return response.data;
  },

  deleteOrganizer: async (organizerId) => {
    const response = await api.delete(`/admin/organizers/${organizerId}`);
    return response.data;
  },

  getReports: async () => {
    const response = await api.get("/admin/reports");
    return response.data;
  },

  getComplaints: async () => {
    const response = await api.get("/admin/complaints");
    return response.data;
  },

  resolveComplaint: async (complaintId, resolution) => {
    const response = await api.put(`/admin/complaints/${complaintId}/resolve`, {
      resolution,
    });
    return response.data;
  },
};
