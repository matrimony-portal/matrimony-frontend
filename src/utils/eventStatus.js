/**
 * Derives display status from event.status and eventDate.
 * - CANCELLED: from DB only.
 * - COMPLETED: eventDate is in the past (DB is not auto-updated when the date passes).
 * - ONGOING: from the backend/DB. Organizers set it via the status API (e.g. when the
 *   event has started). There is no automatic "event has started today" logic.
 * - UPCOMING: default when eventDate is in the future and status is not ONGOING/CANCELLED.
 *
 * @param {{ status?: string, eventDate?: string }} event
 * @returns {'UPCOMING'|'ONGOING'|'COMPLETED'|'CANCELLED'}
 */
export function getDisplayStatus(event) {
  if (!event) return "UPCOMING";
  const s = (event.status || "UPCOMING").toUpperCase();
  if (s === "CANCELLED") return "CANCELLED";
  const eventDate = event.eventDate;
  if (!eventDate) return s;
  const d = new Date(eventDate);
  const now = new Date();
  if (d < now) return "COMPLETED";
  return s;
}

/**
 * @param {{ eventDate?: string }} event
 * @returns {boolean}
 */
export function isEventPast(event) {
  if (!event?.eventDate) return false;
  return new Date(event.eventDate) < new Date();
}
