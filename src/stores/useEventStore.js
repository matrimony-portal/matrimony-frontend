import { create } from "zustand";
import { eventService } from "../services/index.js";
import { handleApiError } from "../services/errors.js";

/**
 * Event Store using Zustand
 * Manages event-related state (for event organizers and users)
 */
export const useEventStore = create((set, get) => ({
  // State
  events: [],
  myEvents: [], // Events created by organizer
  eventRegistrations: [], // Events user registered for
  currentEvent: null,
  filters: {
    search: "",
    city: null,
    state: null,
    eventDate: null,
    status: null, // UPCOMING, ONGOING, COMPLETED, CANCELLED
  },
  loading: false,
  error: null,
  pagination: {
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0,
  },

  // Actions
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }, // Reset to first page on filter change
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        search: "",
        city: null,
        state: null,
        eventDate: null,
        status: null,
      },
      pagination: { ...get().pagination, page: 1 },
    });
  },

  // Fetch all events (with filters)
  fetchEvents: async (filters = null) => {
    set({ loading: true, error: null });
    try {
      const activeFilters = filters || get().filters;
      const response = await eventService.getEvents(activeFilters);

      // Handle different response structures
      const events = response.data || response.events || response;
      const pagination = response.pagination || get().pagination;

      set({
        events: Array.isArray(events) ? events : [],
        pagination,
        loading: false,
        error: null,
      });

      return events;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Fetch single event by ID
  fetchEventById: async (eventId) => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.getEventById(eventId);
      const event = response.data || response;

      set({ currentEvent: event, loading: false, error: null });
      return event;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Create event (organizer only)
  createEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.createEvent(eventData);
      const newEvent = response.data || response;

      set((state) => ({
        events: [newEvent, ...state.events],
        myEvents: [newEvent, ...state.myEvents],
        loading: false,
        error: null,
      }));

      return newEvent;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Update event (organizer only)
  updateEvent: async (eventId, eventData) => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.updateEvent(eventId, eventData);
      const updatedEvent = response.data || response;

      set((state) => ({
        events: state.events.map((e) => (e.id === eventId ? updatedEvent : e)),
        myEvents: state.myEvents.map((e) =>
          e.id === eventId ? updatedEvent : e,
        ),
        currentEvent:
          state.currentEvent?.id === eventId
            ? updatedEvent
            : state.currentEvent,
        loading: false,
        error: null,
      }));

      return updatedEvent;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Delete event (organizer only)
  deleteEvent: async (eventId) => {
    set({ loading: true, error: null });
    try {
      await eventService.deleteEvent(eventId);

      set((state) => ({
        events: state.events.filter((e) => e.id !== eventId),
        myEvents: state.myEvents.filter((e) => e.id !== eventId),
        currentEvent:
          state.currentEvent?.id === eventId ? null : state.currentEvent,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Register for event (user)
  registerForEvent: async (eventId) => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.registerForEvent(eventId);

      set((state) => ({
        currentEvent:
          state.currentEvent?.id === eventId
            ? { ...state.currentEvent, isRegistered: true }
            : state.currentEvent,
        loading: false,
        error: null,
      }));

      return response;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Unregister from event (user)
  unregisterFromEvent: async (eventId) => {
    set({ loading: true, error: null });
    try {
      await eventService.unregisterFromEvent(eventId);

      set((state) => ({
        currentEvent:
          state.currentEvent?.id === eventId
            ? { ...state.currentEvent, isRegistered: false }
            : state.currentEvent,
        loading: false,
        error: null,
      }));
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Fetch my events (organizer)
  fetchMyEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.getMyEvents();
      const events = response.data || response.events || response;

      set({
        myEvents: Array.isArray(events) ? events : [],
        loading: false,
        error: null,
      });

      return events;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Fetch event registrations (organizer)
  fetchEventRegistrations: async (eventId) => {
    set({ loading: true, error: null });
    try {
      const response = await eventService.getEventRegistrations(eventId);
      const registrations = response.data || response.registrations || response;

      set({
        eventRegistrations: Array.isArray(registrations) ? registrations : [],
        loading: false,
        error: null,
      });

      return registrations;
    } catch (error) {
      const appError = handleApiError(error);
      set({ loading: false, error: appError.message });
      throw appError;
    }
  },

  // Set pagination
  setPagination: (pagination) => {
    set({ pagination: { ...get().pagination, ...pagination } });
  },

  // Reset store
  reset: () => {
    set({
      events: [],
      myEvents: [],
      eventRegistrations: [],
      currentEvent: null,
      filters: {
        search: "",
        city: null,
        state: null,
        eventDate: null,
        status: null,
      },
      loading: false,
      error: null,
      pagination: {
        page: 1,
        size: 10,
        total: 0,
        totalPages: 0,
      },
    });
  },
}));
