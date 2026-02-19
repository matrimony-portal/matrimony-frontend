import apiClient from "./apiClient.js";

export const getPhotoUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  return `${apiClient.defaults.baseURL}${filePath}`;
};
