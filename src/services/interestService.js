import apiClient, { handleApiError } from "../utils/apiClient.js";

export const interestService = {
  passUser: async (userId) => {
    try {
      const response = await apiClient.post(`/interests/pass/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  likeUser: async (userId) => {
    try {
      const response = await apiClient.post(`/interests/like/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getLikedUsers: async () => {
    try {
      const response = await apiClient.get("/interests/liked");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
