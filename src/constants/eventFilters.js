// src/constants/eventFilters.js
// Centralized filter options for events

/**
 * Event type options for filter dropdowns
 */
export const EVENT_TYPES = [
  { value: "", label: "All Types" },
  { value: "speed-dating", label: "Speed Dating" },
  { value: "coffee", label: "Coffee Meetup" },
  { value: "dinner", label: "Dinner Event" },
  { value: "cultural", label: "Cultural Evening" },
  { value: "outdoor", label: "Outdoor Activity" },
  { value: "music", label: "Music Night" },
  { value: "picnic", label: "Picnic" },
];

/**
 * City options for filter dropdowns
 */
export const CITIES = [
  { value: "", label: "All Cities" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "ahmedabad", label: "Ahmedabad" },
];

/**
 * Date range options for filter dropdowns
 */
export const DATE_RANGES = [
  { value: "", label: "Anytime" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "custom", label: "Custom Range" },
];

/**
 * Price range options for filter dropdowns
 */
export const PRICE_RANGES = [
  { value: "", label: "Any Price" },
  { value: "free", label: "Free Events" },
  { value: "0-500", label: "₹0 - ₹500" },
  { value: "500-1000", label: "₹500 - ₹1000" },
  { value: "1000+", label: "Above ₹1000" },
];

/**
 * Age group options for filter dropdowns
 */
export const AGE_GROUPS = [
  { value: "", label: "All Ages" },
  { value: "21-25", label: "21-25 years" },
  { value: "26-30", label: "26-30 years" },
  { value: "31-35", label: "31-35 years" },
  { value: "36+", label: "36+ years" },
];

/**
 * Default filter state
 */
export const DEFAULT_EVENT_FILTERS = {
  type: "",
  city: "",
  dateRange: "",
  priceRange: "",
  ageGroup: "",
};

/**
 * Items per page options for pagination
 */
export const ITEMS_PER_PAGE_OPTIONS = [
  { value: 6, label: "6 per page" },
  { value: 12, label: "12 per page" },
  { value: 24, label: "24 per page" },
  { value: 48, label: "48 per page" },
];

/**
 * Default items per page
 */
export const DEFAULT_ITEMS_PER_PAGE = 12;
