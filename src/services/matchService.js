import api from "./api.js";

/**
 * Match API: GET /matches?limit=, GET /matches/my-matches
 */
export const matchService = {
  getMatches: async (limit = 10) => {
    const res = await api.get("/matches", { params: { limit } });
    return Array.isArray(res.data) ? res.data : [];
  },

  getMyMatches: async () => {
    const res = await api.get("/matches/my-matches");
    return Array.isArray(res.data) ? res.data : [];
  },
};
