import apiClient, { handleApiError } from "../utils/apiClient.js";
import { getPhotoUrl } from "../utils/photoUtils.js";

export const photoService = {
  uploadPhoto: async (formData, isPrimary = false) => {
    try {
      const response = await apiClient.post(
        `/photos/upload?isPrimary=${isPrimary}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return { ...response.data, url: getPhotoUrl(response.data.filePath) };
    } catch (error) {
      handleApiError(error);
    }
  },

  getUserPhotos: async (userId) => {
    try {
      const response = await apiClient.get(`/photos/user/${userId}`);
      return response.data.map((photo) => ({
        ...photo,
        url: getPhotoUrl(photo.filePath),
      }));
    } catch (error) {
      handleApiError(error);
    }
  },

  getMyPhotos: async () => {
    try {
      const response = await apiClient.get("/photos/my-photos");
      return response.data.map((photo) => ({
        ...photo,
        url: getPhotoUrl(photo.filePath),
      }));
    } catch (error) {
      handleApiError(error);
    }
  },

  deletePhoto: async (photoId) => {
    try {
      const response = await apiClient.delete(`/photos/${photoId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
