import api from "./api.js";
import { mockEventService } from "./mockService.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

/**
 * Event Service
 * Handles all event-related API calls
 * Uses regular api instance (not adminApi)
 */
export const eventService = {
  // Get all events (with optional filters)
  getEvents: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockEventService.getEvents(filters);
    }
    const response = await api.get("/events", { params: filters });
    return response.data;
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.getEventById(eventId);
    }
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  // Create event (organizer only)
  createEvent: async (eventData) => {
    if (USE_MOCK) {
      return await mockEventService.createEvent(eventData);
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.post("/events", eventData, {
      params: { organizerId },
    });
    return response.data;
  },

  // Update event (organizer only)
  updateEvent: async (eventId, eventData) => {
    if (USE_MOCK) {
      return await mockEventService.updateEvent(eventId, eventData);
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.put(`/events/${eventId}`, eventData, {
      params: { organizerId },
    });
    return response.data;
  },

  // Delete event (organizer only)
  deleteEvent: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.deleteEvent(eventId);
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.delete(`/events/${eventId}`, {
      params: { organizerId },
    });
    return response.data;
  },

  // Update event status (organizer only)
  updateEventStatus: async (eventId, status) => {
    if (USE_MOCK) {
      return await mockEventService.updateEventStatus?.(eventId, status);
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.put(`/events/${eventId}/status`, null, {
      params: { status, organizerId },
    });
    return response.data;
  },

  // Register for event (user)
  registerForEvent: async (eventId, notes) => {
    if (USE_MOCK) {
      return await mockEventService.registerForEvent(eventId);
    }
    // Get userId from localStorage or token
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?.id || user?.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const params = { userId };
    if (notes) params.notes = notes;

    const response = await api.post(`/events/${eventId}/register`, null, {
      params,
    });
    return response.data;
  },

  // Unregister from event (user)
  unregisterFromEvent: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.unregisterFromEvent(eventId);
    }
    const response = await api.delete(`/events/${eventId}/register`);
    return response.data;
  },

  // Get my events (organizer - events they created)
  getMyEvents: async () => {
    if (USE_MOCK) {
      return await mockEventService.getMyEvents();
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.get("/events/my-events", {
      params: { organizerId },
    });
    return response.data;
  },

  // Get event registrations (organizer - who registered for their event)
  getEventRegistrations: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.getEventRegistrations(eventId);
    }
    const response = await api.get(`/events/${eventId}/registrations`);
    return response.data;
  },

  // Get all registrations for organizer's events
  getMyEventRegistrations: async () => {
    if (USE_MOCK) {
      return await mockEventService.getMyEventRegistrations();
    }
    const response = await api.get("/events/registrations/my-events");
    return response.data;
  },

  // Update registration payment status (organizer only)
  updateRegistrationPaymentStatus: async (registrationId, paymentStatus) => {
    if (USE_MOCK) {
      return await mockEventService.updateRegistrationPaymentStatus(
        registrationId,
        paymentStatus,
      );
    }
    const response = await api.put(
      `/events/registrations/${registrationId}/payment-status`,
      null,
      {
        params: { paymentStatus },
      },
    );
    return response.data;
  },

  // Update registration attendance (organizer only)
  updateRegistrationAttendance: async (registrationId, attended) => {
    if (USE_MOCK) {
      return await mockEventService.updateRegistrationAttendance(
        registrationId,
        attended,
      );
    }
    const response = await api.put(
      `/events/registrations/${registrationId}/attendance`,
      null,
      {
        params: { attended },
      },
    );
    return response.data;
  },

  // Get event statistics for organizer dashboard
  getEventStatistics: async () => {
    if (USE_MOCK) {
      return await mockEventService.getEventStatistics();
    }
    const userStr = localStorage.getItem("matrimony_user");
    const user = userStr ? JSON.parse(userStr) : null;
    const organizerId = user?.id || user?.userId;

    if (!organizerId) {
      throw new Error("User not authenticated");
    }

    const response = await api.get("/events/statistics", {
      params: { organizerId },
    });
    return response.data;
  },
};
