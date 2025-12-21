import api from "./api.js";

export const userService = {
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/users/profile", profileData);
    return response.data;
  },

  uploadPhoto: async (formData) => {
    const response = await api.post("/users/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deletePhoto: async (photoId) => {
    const response = await api.delete(`/users/photos/${photoId}`);
    return response.data;
  },

  searchUsers: async (filters) => {
    const response = await api.get("/users/search", { params: filters });
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  blockUser: async (userId) => {
    const response = await api.post(`/users/${userId}/block`);
    return response.data;
  },

  unblockUser: async (userId) => {
    const response = await api.delete(`/users/${userId}/block`);
    return response.data;
  },

  getBlockedUsers: async () => {
    const response = await api.get("/users/blocked");
    return response.data;
  },
};
