import {
  successResponse,
  errorResponse,
  validationError,
  unauthorizedError,
  Messages,
} from "../utils/responseStructure";

export const authService = {
  async login(email, password) {
    try {
      if (!email || !password) {
        return validationError(Messages.VALIDATION_ERROR, [
          "Email and password are required",
        ]);
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        return unauthorizedError(Messages.INVALID_CREDENTIALS);
      }

      if (!response.ok) {
        return errorResponse(Messages.OPERATION_FAILED);
      }

      const userData = await response.json();
      return successResponse(Messages.LOGIN_SUCCESS, userData);
    } catch {
      return errorResponse(Messages.SERVER_ERROR);
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        return errorResponse(Messages.OPERATION_FAILED);
      }

      const updatedProfile = await response.json();
      return successResponse(Messages.PROFILE_UPDATED, updatedProfile);
    } catch {
      return errorResponse(Messages.SERVER_ERROR);
    }
  },
};
