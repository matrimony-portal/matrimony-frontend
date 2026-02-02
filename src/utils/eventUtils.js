/**
 * Default images for event types (assets in public/assets/images/event-images/).
 * Used when an event has no imageUrl/image so event cards show a type-appropriate image.
 *
 * al-elmes -> Lunch (future)
 * considerate-agency -> Cultural
 * nathan-dumlao -> Coffee Meetup
 * surface -> Speed Dating
 * vitaly -> Outdoor (future)
 * yaw-afari -> Dinner
 */
const EVENT_TYPE_IMAGE_MAP = {
  SPEED_DATING: "surface-aqdPtCtq3dY-unsplash.jpg",
  COFFEE_MEETUP: "nathan-dumlao-I_394sxx0ec-unsplash.jpg",
  DINNER: "yaw-afari-KpzGmDvzhS4-unsplash.jpg",
  CULTURAL: "considerate-agency-UrzN-8K1PCE-unsplash.jpg",
  LUNCH: "al-elmes-ULHxWq8reao-unsplash.jpg",
  OUTDOOR: "vitaly-gariev-QHbFs5j6MNU-unsplash.jpg",
};

const BASE = "/assets/images/event-images/";
const FALLBACK_IMAGE = BASE + "surface-aqdPtCtq3dY-unsplash.jpg";

/**
 * Returns the default image filename for an event type. Used for event cards when
 * the event has no imageUrl/image.
 * @param {string} [eventType]
 * @returns {string} Full path to the image
 */
export function getDefaultImageForEventType(eventType) {
  if (!eventType) return FALLBACK_IMAGE;
  const file = EVENT_TYPE_IMAGE_MAP[eventType];
  return file ? BASE + file : FALLBACK_IMAGE;
}

/**
 * Best image to show for an event: imageUrl/image if set, otherwise the type default.
 * @param {{ imageUrl?: string | null, image?: string | null, eventType?: string }} event
 * @returns {string}
 */
export function getDefaultEventImage(event) {
  const url = event?.imageUrl || event?.image;
  if (url && String(url).trim()) return url.trim();
  return getDefaultImageForEventType(event?.eventType);
}
