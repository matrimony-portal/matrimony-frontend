// Standard API Response Structure for Matrimony App

export const ResponseTypes = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const StatusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Base Response Structure
export const createResponse = (
  type,
  message,
  data = null,
  statusCode = 200,
) => ({
  success: type === ResponseTypes.SUCCESS,
  type,
  message,
  data,
  statusCode,
  timestamp: new Date().toISOString(),
});

// Success Responses
export const successResponse = (message, data = null) =>
  createResponse(ResponseTypes.SUCCESS, message, data, StatusCodes.SUCCESS);

export const createdResponse = (message, data = null) =>
  createResponse(ResponseTypes.SUCCESS, message, data, StatusCodes.CREATED);

// Error Responses
export const errorResponse = (message, statusCode = StatusCodes.SERVER_ERROR) =>
  createResponse(ResponseTypes.ERROR, message, null, statusCode);

export const validationError = (message, errors = []) =>
  createResponse(
    ResponseTypes.ERROR,
    message,
    { errors },
    StatusCodes.BAD_REQUEST,
  );

export const unauthorizedError = (message = "Unauthorized access") =>
  createResponse(ResponseTypes.ERROR, message, null, StatusCodes.UNAUTHORIZED);

export const notFoundError = (message = "Resource not found") =>
  createResponse(ResponseTypes.ERROR, message, null, StatusCodes.NOT_FOUND);

// Warning/Info Responses
export const warningResponse = (message, data = null) =>
  createResponse(ResponseTypes.WARNING, message, data);

export const infoResponse = (message, data = null) =>
  createResponse(ResponseTypes.INFO, message, data);

// Common Response Messages
export const Messages = {
  // Auth
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  REGISTER_SUCCESS: "Registration successful",
  INVALID_CREDENTIALS: "Invalid email or password",

  // Profile
  PROFILE_UPDATED: "Profile updated successfully",
  PHOTO_UPLOADED: "Photo uploaded successfully",
  PHOTO_DELETED: "Photo deleted successfully",

  // Matches
  PROPOSAL_SENT: "Proposal sent successfully",
  PROPOSAL_ACCEPTED: "Proposal accepted",
  PROPOSAL_REJECTED: "Proposal rejected",
  SHORTLISTED: "Added to shortlist",
  REMOVED_SHORTLIST: "Removed from shortlist",

  // Admin
  USER_BLOCKED: "User blocked successfully",
  USER_UNBLOCKED: "User unblocked successfully",
  ORGANIZER_ADDED: "Organizer added successfully",

  // Generic
  OPERATION_SUCCESS: "Operation completed successfully",
  OPERATION_FAILED: "Operation failed",
  VALIDATION_ERROR: "Please check your input",
  SERVER_ERROR: "Something went wrong. Please try again.",
};
