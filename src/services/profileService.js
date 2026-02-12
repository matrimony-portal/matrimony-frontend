import apiClient, { handleApiError } from "../utils/apiClient.js";
import { getPhotoUrl } from "../utils/photoUtils.js";

export const profileService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get("/profile");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getProfileById: async (id) => {
    try {
      const response = await apiClient.get(`/profile/${id}`);
      if (response.data?.data?.photoUrls) {
        response.data.data.photos =
          response.data.data.photoUrls.map(getPhotoUrl);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/profile", profileData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
