// src/routes/routeConfig.js
// Centralized route configuration for the application

/**
 * Public routes accessible without authentication
 */
export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  UPGRADE: "/upgrade",
  SUBSCRIPTION: "/subscription",
  PAYMENT: "/payment",
  FEEDBACK: "/feedback",
  CONTACT: "/contact",
};

/**
 * Dashboard base paths by user type
 */
export const DASHBOARD_PATHS = {
  FREE: "/dashboard/free",
  PREMIUM: "/dashboard/premium",
  ORGANIZER: "/dashboard/organizer",
  ADMIN: "/dashboard/admin",
};

/**
 * Free user dashboard routes
 */
export const FREE_USER_ROUTES = [
  { path: "", label: "Dashboard" },
  { path: "manage-profile", label: "Manage Profile" },
  { path: "edit-profile", label: "Edit Profile" },
  { path: "manage-photos", label: "Manage Photos" },
  { path: "search", label: "Search Matches" },
  { path: "proposals", label: "Proposals" },
  { path: "messages", label: "Messages" },
  { path: "shortlist", label: "Shortlist" },
  { path: "blocked-users", label: "Blocked Users" },
  { path: "events", label: "Events" },
  { path: "settings", label: "Settings" },
  { path: "feedback", label: "Feedback" },
  { path: "profile/:id", label: "View Profile" },
  { path: "organizer-profile/:organizerId", label: "Organizer Profile" },
  { path: "subscription", label: "Subscription" },
  { path: "contact", label: "Contact" },
];

/**
 * Premium user dashboard routes
 */
export const PREMIUM_USER_ROUTES = [
  { path: "", label: "Dashboard" },
  { path: "my-profile", label: "My Profile" },
  { path: "manage-profile", label: "Manage Profile" },
  { path: "edit-profile", label: "Edit Profile" },
  { path: "manage-photos", label: "Manage Photos" },
  { path: "search", label: "Search Matches" },
  { path: "proposals", label: "Proposals" },
  { path: "messages", label: "Messages" },
  { path: "shortlist", label: "Shortlist" },
  { path: "blocked-users", label: "Blocked Users" },
  { path: "events", label: "Events" },
  { path: "settings", label: "Settings" },
  { path: "feedback", label: "Feedback" },
  { path: "profile/:id", label: "View Profile" },
  { path: "organizer-profile/:organizerId", label: "Organizer Profile" },
  { path: "subscription", label: "Subscription" },
  { path: "contact", label: "Contact" },
];

/**
 * Organizer dashboard routes
 */
export const ORGANIZER_ROUTES = [
  { path: "", label: "Dashboard" },
  { path: "my-profile", label: "My Profile" },
  { path: "edit-profile", label: "Edit Profile" },
  { path: "create-event", label: "Create Event" },
  { path: "my-events", label: "My Events" },
  { path: "events", label: "All Events" },
  { path: "event-requests", label: "Event Requests" },
  { path: "event-details", label: "Event Details" },
  { path: "event-view/:eventId", label: "View Event" },
  { path: "event-edit/:eventId", label: "Edit Event" },
  { path: "messages", label: "Messages" },
  { path: "blocked-users", label: "Blocked Users" },
  { path: "settings", label: "Settings" },
  { path: "contact", label: "Contact" },
];

/**
 * Admin dashboard routes
 */
export const ADMIN_ROUTES = [
  { path: "", label: "Dashboard" },
  { path: "manage-users", label: "Manage Users" },
  { path: "manage-organizers", label: "Manage Organizers" },
  { path: "add-organizer", label: "Add Organizer" },
  { path: "edit-organizer/:id", label: "Edit Organizer" },
  { path: "organizer-profile/:id", label: "Organizer Profile" },
  { path: "manage-success-stories", label: "Success Stories" },
  { path: "add-success-story", label: "Add Story" },
  { path: "edit-success-story/:id", label: "Edit Story" },
  { path: "reports-complaints", label: "Reports & Complaints" },
];

/**
 * Legacy routes that redirect to user-type specific routes
 */
export const LEGACY_ROUTES = [
  "search",
  "proposals",
  "messages",
  "shortlist",
  "events",
  "settings",
  "edit-profile",
  "manage-photos",
  "manage-profile",
  "blocked-users",
  "feedback",
  "my-profile",
];

/**
 * Get the full path for a route
 * @param {string} basePath - Base dashboard path
 * @param {string} subPath - Sub path within dashboard
 * @returns {string} Full path
 */
export const getFullPath = (basePath, subPath) => {
  if (!subPath) return basePath;
  return `${basePath}/${subPath}`.replace(/\/+/g, "/");
};

/**
 * Navigation items for sidebar by user type
 */
export const getSidebarNavItems = (userType) => {
  const baseItems = [
    { path: "", icon: "bi-house-door", label: "Dashboard" },
    { path: "search", icon: "bi-search", label: "Search" },
    { path: "proposals", icon: "bi-envelope-heart", label: "Proposals" },
    { path: "messages", icon: "bi-chat-dots", label: "Messages" },
    { path: "events", icon: "bi-calendar-event", label: "Events" },
  ];

  if (userType === "organizer") {
    return [
      { path: "", icon: "bi-house-door", label: "Dashboard" },
      { path: "my-events", icon: "bi-calendar2-check", label: "My Events" },
      { path: "create-event", icon: "bi-plus-circle", label: "Create Event" },
      { path: "event-requests", icon: "bi-inbox", label: "Requests" },
      { path: "messages", icon: "bi-chat-dots", label: "Messages" },
      { path: "settings", icon: "bi-gear", label: "Settings" },
    ];
  }

  if (userType === "admin") {
    return [
      { path: "", icon: "bi-speedometer2", label: "Dashboard" },
      { path: "manage-users", icon: "bi-people", label: "Users" },
      {
        path: "manage-organizers",
        icon: "bi-person-badge",
        label: "Organizers",
      },
      { path: "manage-success-stories", icon: "bi-heart", label: "Stories" },
      { path: "reports-complaints", icon: "bi-flag", label: "Reports" },
    ];
  }

  // Free and Premium users
  return [
    ...baseItems,
    { path: "shortlist", icon: "bi-star", label: "Shortlist" },
    { path: "settings", icon: "bi-gear", label: "Settings" },
  ];
};
