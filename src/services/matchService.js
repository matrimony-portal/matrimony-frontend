import apiClient, { handleApiError } from "../utils/apiClient.js";
import { getPhotoUrl } from "../utils/photoUtils.js";

export const matchService = {
  getPotentialMatches: async () => {
    try {
      const response = await apiClient.get("/matches/discover");
      return response.data.map((match) => ({
        ...match,
        profilePhoto: getPhotoUrl(match.profilePhotoUrl),
      }));
    } catch (error) {
      handleApiError(error);
    }
  },

  getMatches: async () => {
    try {
      const response = await apiClient.get("/matches");
      return response.data.map((match) => ({
        ...match,
        profilePhoto: getPhotoUrl(match.profilePhotoUrl),
      }));
    } catch (error) {
      handleApiError(error);
    }
  },
};
