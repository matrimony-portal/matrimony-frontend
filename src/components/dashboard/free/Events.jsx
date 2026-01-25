// src/components/dashboard/free/Events.jsx
// Re-exports shared Events component with free user configuration
import Events from "../shared/Events.jsx";
import {
  freeUserService,
  organizerService,
} from "../../../services/jsonDataService.js";

// Create an event service adapter for free users
const freeEventService = {
  getEvents: async (filters) => {
    const events = await freeUserService.getEvents(filters);
    // Enrich events with organizer info
    return Promise.all(
      events.map(async (event) => {
        const organizer = await organizerService.getOrganizerById(
          event.organizerId,
        );
        return {
          ...event,
          organizerName: organizer?.name || "Unknown Organizer",
        };
      }),
    );
  },
  registerForEvent: (userId, eventId) =>
    freeUserService.registerForEvent(userId, eventId),
};

const FreeEvents = () => (
  <Events userType="free" eventService={freeEventService} />
);

export default FreeEvents;
