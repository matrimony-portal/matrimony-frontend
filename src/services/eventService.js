import api from "./api.js";

export const eventService = {
  getEvents: async (filters = {}) => {
    const response = await api.get("/events", { params: filters });
    return response.data;
  },

  getEventById: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  },

  unregisterFromEvent: async (eventId) => {
    const response = await api.delete(`/events/${eventId}/register`);
    return response.data;
  },

  getMyEvents: async () => {
    const response = await api.get("/events/my-events");
    return response.data;
  },

  getEventRegistrations: async (eventId) => {
    const response = await api.get(`/events/${eventId}/registrations`);
    return response.data;
  },
};
