import api from "./api.js";

/**
 * Profile API: GET /profile, PUT /profile
 * Backend returns ApiResponse<UserProfileResponse>; we unwrap .data
 */
const unwrap = (res) => res?.data?.data ?? res?.data;

export const profileService = {
  getProfile: async () => {
    const res = await api.get("/profile");
    return unwrap(res);
  },

  updateProfile: async (data) => {
    const res = await api.put("/profile", data);
    return unwrap(res);
  },
};
