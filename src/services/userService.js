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

  // Preferences methods
  getPreferences: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        ageMin: 21,
        ageMax: 35,
        heightMin: 150,
        heightMax: 180,
        maritalStatus: ["never-married"],
        religion: [],
        caste: "",
        educationMin: "bachelors",
        occupation: [],
        incomeMin: "any",
        country: ["India"],
        state: "",
        city: "",
        diet: "any",
        smoking: "any",
        drinking: "any",
        manglik: "any",
        motherTongue: [],
        physicalStatus: "any",
      };
    }
    const response = await api.get("/users/preferences");
    return response.data;
  },

  updatePreferences: async (preferences) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true, preferences };
    }
    const response = await api.put("/users/preferences", { preferences });
    return response.data;
  },

  // Profile completion status
  getProfileCompletion: async () => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        overall: 65,
        sections: {
          basic: { completed: true, percentage: 100 },
          photos: { completed: false, percentage: 60 },
          education: { completed: true, percentage: 100 },
          family: { completed: false, percentage: 0 },
          about: { completed: false, percentage: 50 },
          preferences: { completed: false, percentage: 0 },
        },
      };
    }
    const response = await api.get("/users/profile/completion");
    return response.data;
  },
};
