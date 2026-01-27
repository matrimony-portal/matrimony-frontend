import api from "./api.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const organizerService = {
  /**
   * Get organizer profile
   * @param {number} organizerId - Organizer user ID
   * @returns {Promise<Object>} Organizer profile data
   */
  getProfile: async (organizerId) => {
    if (USE_MOCK) {
      // Mock data for development
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        id: organizerId || 2,
        email: "organizer@matrimony.com",
        firstName: "Event",
        lastName: "Organizer",
        phone: "+1234567891",
        fullName: "Event Organizer",
        dateOfBirth: "1990-01-15",
        age: 34,
        gender: "MALE",
        religion: "Hindu",
        caste: "Baniya",
        occupation: "Event Organizer",
        education: "BBA",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        aboutMe:
          "I'm a 34-year-old Event Manager based in Pune, working with a leading event managing firm, Cupid Knot. I did my BBA from ISB Hyderabad. I enjoy reading about startups, exploring new cuisines, and keeping fit through running and yoga. Family and work-life balance matter a lot to me.",
        totalEvents: 2,
        upcomingEvents: 2,
        completedEvents: 0,
      };
    }
    const response = await api.get(`/organizers/${organizerId}/profile`);
    return response.data?.data || response.data;
  },

  /**
   * Update organizer profile
   * @param {number} organizerId - Organizer user ID
   * @param {Object} data - { firstName, lastName, phone?, city?, state?, aboutMe? }
   * @returns {Promise<Object>} Updated organizer profile
   */
  updateProfile: async (organizerId, data) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { ...data, id: organizerId };
    }
    const response = await api.put(`/organizers/${organizerId}/profile`, data);
    return response.data?.data || response.data;
  },
};
