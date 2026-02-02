import api from "./api.js";
import { mockEventService } from "./mockServices.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

function getOrganizerId() {
  const userStr = localStorage.getItem("matrimony_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const id = user?.id ?? user?.userId ?? user?.organizerId;
  if (!id) throw new Error("User not authenticated");
  return id;
}

function getUserId() {
  const userStr = localStorage.getItem("matrimony_user");
  const user = userStr ? JSON.parse(userStr) : null;
  const id = user?.id ?? user?.userId;
  if (!id) throw new Error("User not authenticated");
  return id;
}

/**
 * Event Service
 * Handles all event-related API calls
 * Uses regular api instance (not adminApi)
 * Backend returns raw JSON (no ApiResponse wrapper) for event endpoints.
 */
export const eventService = {
  // Get all events (with optional filters)
  getEvents: async (filters = {}) => {
    if (USE_MOCK) {
      return await mockEventService.getEvents(filters);
    }
    const response = await api.get("events", { params: filters });
    const raw = response.data;
    return Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.getEventById(eventId);
    }
    const response = await api.get(`events/${eventId}`);
    return response.data;
  },

  // Create event (organizer only)
  createEvent: async (eventData) => {
    if (USE_MOCK) {
      return await mockEventService.createEvent(eventData);
    }
    const organizerId = getOrganizerId();
    const response = await api.post("events", eventData, {
      params: { organizerId },
    });
    return response.data;
  },

  // Update event (organizer only)
  updateEvent: async (eventId, eventData) => {
    if (USE_MOCK) {
      return await mockEventService.updateEvent(eventId, eventData);
    }
    const organizerId = getOrganizerId();
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
    const organizerId = getOrganizerId();
    const response = await api.delete(`events/${eventId}`, {
      params: { organizerId },
    });
    return response.data;
  },

  // Update event status (organizer only)
  updateEventStatus: async (eventId, status) => {
    if (USE_MOCK) {
      return await mockEventService.updateEventStatus?.(eventId, status);
    }
    const organizerId = getOrganizerId();
    const response = await api.put(`events/${eventId}/status`, null, {
      params: { status, organizerId },
    });
    return response.data;
  },

  // Register for event (user)
  registerForEvent: async (eventId, notes) => {
    if (USE_MOCK) {
      return await mockEventService.registerForEvent(eventId);
    }
    const userId = getUserId();
    const params = { userId };
    if (notes) params.notes = notes;
    const response = await api.post(`events/${eventId}/register`, null, {
      params,
    });
    return response.data;
  },

  // Unregister from event (user)
  unregisterFromEvent: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.unregisterFromEvent(eventId);
    }
    const userId = getUserId();
    const response = await api.delete(`events/${eventId}/register`, {
      params: { userId },
    });
    return response.data;
  },

  // Get events by organizer (for viewing another organizer's profile + events)
  getEventsByOrganizer: async (organizerId) => {
    if (USE_MOCK) {
      return (await mockEventService.getEventsByOrganizer?.(organizerId)) ?? [];
    }
    const response = await api.get(`events/organizer/${organizerId}`);
    return response.data;
  },

  // Get my events (organizer - events they created)
  getMyEvents: async () => {
    if (USE_MOCK) {
      return await mockEventService.getMyEvents();
    }
    const organizerId = getOrganizerId();
    const response = await api.get("events/my-events", {
      params: { organizerId },
    });
    return response.data;
  },

  // Get event registrations (organizer - who registered for their event)
  getEventRegistrations: async (eventId) => {
    if (USE_MOCK) {
      return await mockEventService.getEventRegistrations(eventId);
    }
    const organizerId = getOrganizerId();
    const response = await api.get(`events/${eventId}/registrations`, {
      params: { organizerId },
    });
    return response.data;
  },

  // Get all registrations for organizer's events
  getMyEventRegistrations: async () => {
    if (USE_MOCK) {
      return await mockEventService.getMyEventRegistrations();
    }
    const organizerId = getOrganizerId();
    const response = await api.get("events/registrations/my-events", {
      params: { organizerId },
    });
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
    const organizerId = getOrganizerId();
    const response = await api.put(
      `events/registrations/${registrationId}/payment-status`,
      null,
      {
        params: { paymentStatus, organizerId },
      },
    );
    return response.data;
  },

  // Get participant profile (organizer only - for viewing users who sent requests)
  getParticipantProfile: async (registrationId) => {
    if (USE_MOCK) {
      return {
        userName: "Sample User",
        userEmail: "user@example.com",
        age: 28,
        city: "Mumbai",
      };
    }
    const organizerId = getOrganizerId();
    const response = await api.get(
      `/events/registrations/${registrationId}/participant-profile`,
      {
        params: { organizerId },
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
    const organizerId = getOrganizerId();
    const response = await api.put(
      `events/registrations/${registrationId}/attendance`,
      null,
      {
        params: { attended, organizerId },
      },
    );
    return response.data;
  },

  // Get event statistics for organizer dashboard
  getEventStatistics: async () => {
    if (USE_MOCK) {
      return await mockEventService.getEventStatistics();
    }
    const organizerId = getOrganizerId();
    const response = await api.get("events/statistics", {
      params: { organizerId },
    });
    return response.data;
  },

  // Get my event registrations (for regular users: which events I'm registered for)
  getMyRegistrations: async () => {
    if (USE_MOCK) {
      return [];
    }
    const userId = getUserId();
    const response = await api.get("events/my-registrations", {
      params: { userId },
    });
    return Array.isArray(response.data) ? response.data : [];
  },
};
