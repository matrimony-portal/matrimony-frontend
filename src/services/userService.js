import api from "./api.js";
import { mockUserService } from "./mockServices.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const userService = {
  getProfile: async () => {
    if (USE_MOCK) {
      return await mockUserService.getProfile();
    }
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    if (USE_MOCK) {
      return await mockUserService.updateProfile(profileData);
    }
    const response = await api.put("/users/profile", profileData);
    return response.data;
  },

  searchUsers: async (filters) => {
    if (USE_MOCK) {
      return await mockUserService.searchUsers(filters);
    }
    const response = await api.get("/users/search", { params: filters });
    return response.data;
  },

  getUserById: async (userId) => {
    if (USE_MOCK) {
      return await mockUserService.getProfile(userId);
    }
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  uploadPhoto: async (formData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { photoUrl: `mock-photo-${Date.now()}.jpg` };
    }
    const response = await api.post("/users/photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  deletePhoto: async (photoId) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    }
    const response = await api.delete(`/users/photos/${photoId}`);
    return response.data;
  },

  blockUser: async (userId) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    }
    const response = await api.post(`/users/${userId}/block`);
    return response.data;
  },

  unblockUser: async (userId) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    }
    const response = await api.delete(`/users/${userId}/block`);
    return response.data;
  },

  getBlockedUsers: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return [];
    }
    const response = await api.get("/users/blocked");
    return response.data;
  },
};
