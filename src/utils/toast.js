// src/utils/toast.js
// Centralized toast notification utility using react-toastify
import { toast as toastify } from "react-toastify";

/**
 * Default toast configuration
 */
const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Toast utility object with methods for different notification types
 */
export const toast = {
  /**
   * Show a success toast notification
   * @param {string} message - The message to display
   * @param {object} options - Optional toast options
   */
  success: (message, options = {}) => {
    toastify.success(message, { ...defaultOptions, ...options });
  },

  /**
   * Show an error toast notification
   * @param {string} message - The message to display
   * @param {object} options - Optional toast options
   */
  error: (message, options = {}) => {
    toastify.error(message, { ...defaultOptions, autoClose: 5000, ...options });
  },

  /**
   * Show a warning toast notification
   * @param {string} message - The message to display
   * @param {object} options - Optional toast options
   */
  warning: (message, options = {}) => {
    toastify.warning(message, { ...defaultOptions, ...options });
  },

  /**
   * Show an info toast notification
   * @param {string} message - The message to display
   * @param {object} options - Optional toast options
   */
  info: (message, options = {}) => {
    toastify.info(message, { ...defaultOptions, ...options });
  },

  /**
   * Show a loading toast that can be updated later
   * @param {string} message - The loading message
   * @returns {string|number} Toast ID for updating
   */
  loading: (message) => {
    return toastify.loading(message, { ...defaultOptions, autoClose: false });
  },

  /**
   * Update an existing toast (useful for loading -> success/error transitions)
   * @param {string|number} toastId - The toast ID to update
   * @param {object} options - Update options including render, type, isLoading
   */
  update: (toastId, options) => {
    toastify.update(toastId, {
      ...defaultOptions,
      ...options,
      isLoading: false,
    });
  },

  /**
   * Dismiss a specific toast or all toasts
   * @param {string|number} toastId - Optional toast ID to dismiss
   */
  dismiss: (toastId) => {
    if (toastId) {
      toastify.dismiss(toastId);
    } else {
      toastify.dismiss();
    }
  },

  /**
   * Show a promise-based toast that updates based on promise resolution
   * @param {Promise} promise - The promise to track
   * @param {object} messages - Object with pending, success, error messages
   * @param {object} options - Optional toast options
   */
  promise: (promise, messages, options = {}) => {
    return toastify.promise(
      promise,
      {
        pending: messages.pending || "Loading...",
        success: messages.success || "Success!",
        error: messages.error || "Something went wrong",
      },
      { ...defaultOptions, ...options },
    );
  },
};

/**
 * Pre-configured toast messages for common actions
 */
export const toastMessages = {
  // Auth messages
  loginSuccess: "Welcome back! You have logged in successfully.",
  loginError: "Invalid credentials. Please try again.",
  logoutSuccess: "You have been logged out successfully.",
  registerSuccess: "Account created successfully! Please login.",

  // Profile messages
  profileUpdated: "Profile updated successfully!",
  photoUploaded: "Photo uploaded successfully!",
  photoDeleted: "Photo deleted successfully!",

  // Proposal messages
  proposalSent: (name) => `Interest sent to ${name}!`,
  proposalAccepted: (name) => `You accepted ${name}'s proposal!`,
  proposalDeclined: (name) => `You declined ${name}'s proposal.`,

  // Event messages
  eventRegistered: (name) => `Successfully registered for ${name}!`,
  eventCancelled: "Registration cancelled successfully.",

  // Settings messages
  settingsSaved: "Settings saved successfully!",
  passwordChanged: "Password changed successfully!",

  // Error messages
  networkError: "Network error. Please check your connection.",
  serverError: "Server error. Please try again later.",
  validationError: "Please check the form for errors.",
  unauthorized: "Session expired. Please login again.",

  // General messages
  copied: "Copied to clipboard!",
  saved: "Changes saved successfully!",
  deleted: "Deleted successfully!",
  added: "Added successfully!",
};

export default toast;
