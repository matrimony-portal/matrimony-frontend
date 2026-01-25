// src/utils/dateFormat.js
// Centralized date and time formatting utilities

/**
 * Month abbreviations used throughout the application
 */
export const MONTH_NAMES_SHORT = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const MONTH_NAMES_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format a date string into day and month components for event cards
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {{ day: string, month: string }} Formatted day and month
 */
export const formatEventDate = (dateStr) => {
  if (!dateStr) return { day: "--", month: "---" };

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { day: "--", month: "---" };

  return {
    day: date.getDate().toString(),
    month: MONTH_NAMES_SHORT[date.getMonth()],
  };
};

/**
 * Format time from 24-hour to 12-hour format
 * @param {string} timeStr - Time string in HH:MM format (e.g., "18:30")
 * @returns {string} Formatted time in 12-hour format (e.g., "6:30 PM")
 */
export const formatTime12Hour = (timeStr = "00:00") => {
  if (!timeStr || typeof timeStr !== "string") return "12:00 AM";

  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "12:00 AM";

  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${hour12}:${paddedMinutes} ${ampm}`;
};

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol (default: ₹)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = "₹") => {
  if (price === 0 || price === null || price === undefined) return "Free";
  return `${currency}${price.toLocaleString("en-IN")}`;
};

/**
 * Format a date for display in UI (e.g., "Oct 15, 2025")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDateDisplay = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const month = MONTH_NAMES_SHORT[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

/**
 * Format a date for display with full month name
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Formatted date string (e.g., "October 15, 2025")
 */
export const formatDateDisplayFull = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const month = MONTH_NAMES_FULL[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

/**
 * Get relative time string (e.g., "2 hours ago", "Yesterday")
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;

  return formatDateDisplay(dateStr);
};

/**
 * Check if a date is today
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {boolean}
 */
export const isToday = (dateStr) => {
  if (!dateStr) return false;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;

  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the past
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {boolean}
 */
export const isPast = (dateStr) => {
  if (!dateStr) return false;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;

  return date < new Date();
};

/**
 * Format time range (e.g., "6:00 PM - 9:00 PM")
 * @param {string} startTime - Start time in HH:MM format
 * @param {string} endTime - End time in HH:MM format
 * @returns {string} Formatted time range
 */
export const formatTimeRange = (startTime, endTime) => {
  return `${formatTime12Hour(startTime)} - ${formatTime12Hour(endTime)}`;
};
