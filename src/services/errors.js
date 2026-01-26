/**
 * Custom Error Classes for Better Error Handling
 * Industry-standard error handling pattern
 */

export class AppError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  SUBSCRIPTION_REQUIRED: "SUBSCRIPTION_REQUIRED",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  TIMEOUT: "TIMEOUT",
};

/**
 * Enhanced API Error Handler
 * Converts axios errors to AppError instances
 */
export const handleApiError = (error) => {
  // Network errors
  if (!navigator.onLine) {
    return new AppError(
      "You are offline. Please check your internet connection.",
      ErrorCodes.NETWORK_ERROR,
    );
  }

  if (error.code === "ECONNABORTED" || error.message === "Network Error") {
    return new AppError(
      "Network error. Please check your connection.",
      ErrorCodes.NETWORK_ERROR,
    );
  }

  // No response from server
  if (!error.response) {
    return new AppError(
      "Server is not responding. Please try again later.",
      ErrorCodes.SERVER_ERROR,
    );
  }

  const { status, data } = error.response;

  // Handle different HTTP status codes
  const errorMap = {
    400: () => {
      // Validation errors
      if (data.validationErrors) {
        const firstError = Object.values(data.validationErrors)[0];
        return new AppError(
          firstError || data.message || "Invalid request",
          ErrorCodes.VALIDATION_ERROR,
          { validationErrors: data.validationErrors },
        );
      }
      return new AppError(
        data.message || "Invalid request",
        ErrorCodes.VALIDATION_ERROR,
        data,
      );
    },
    401: () => {
      return new AppError(
        "Session expired. Please login again.",
        ErrorCodes.UNAUTHORIZED,
      );
    },
    403: () => {
      if (data.code === "PREMIUM_REQUIRED") {
        return new AppError(
          data.message || "This feature requires a premium subscription",
          ErrorCodes.SUBSCRIPTION_REQUIRED,
          data,
        );
      }
      return new AppError(
        data.message || "Access denied",
        ErrorCodes.FORBIDDEN,
        data,
      );
    },
    404: () => {
      return new AppError(
        data.message || "Resource not found",
        ErrorCodes.NOT_FOUND,
        data,
      );
    },
    429: () => {
      return new AppError(
        "Too many requests. Please try again later.",
        ErrorCodes.RATE_LIMIT_EXCEEDED,
      );
    },
    500: () => {
      return new AppError(
        data.message || "Server error. Please try again later.",
        ErrorCodes.SERVER_ERROR,
        data,
      );
    },
  };

  return (
    errorMap[status]?.() ||
    new AppError(
      data.message || "An unexpected error occurred",
      ErrorCodes.SERVER_ERROR,
      data,
    )
  );
};

/**
 * Check if error is a specific type
 */
export const isErrorType = (error, code) => {
  return error instanceof AppError && error.code === code;
};
