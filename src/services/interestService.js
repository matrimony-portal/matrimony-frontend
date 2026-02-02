import api from "./api.js";

/**
 * Interest API: like, pass, get liked user IDs
 * POST /interests/like/{userId}, POST /interests/pass/{userId}, GET /interests/liked
 */
export const interestService = {
  likeUser: async (userId) => {
    await api.post(`/interests/like/${userId}`);
  },

  passUser: async (userId) => {
    await api.post(`/interests/pass/${userId}`);
  },

  getLikedUsers: async () => {
    const res = await api.get("/interests/liked");
    return Array.isArray(res.data) ? res.data : [];
  },
};
