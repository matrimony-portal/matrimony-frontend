import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { handleApiError, isErrorType, ErrorCodes } from "../services/errors.js";

/**
 * Custom Hook for API Calls
 * Provides loading, error, and data state management
 * Industry-standard pattern for async operations
 */
export const useApiCall = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
  });

  const execute = useCallback(async (apiFunc, options = {}) => {
    const {
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      showErrorToast = true,
      showSuccessToast = true,
      silent = false, // If true, don't show any toasts
    } = options;

    setState({ loading: true, error: null, data: null });

    try {
      const data = await apiFunc();
      setState({ loading: false, error: null, data });

      if (!silent && showSuccessToast && successMessage) {
        toast.success(successMessage);
      }

      onSuccess?.(data);
      return data;
    } catch (error) {
      const appError = handleApiError(error);
      setState({ loading: false, error: appError, data: null });

      // Handle subscription required specially
      if (isErrorType(appError, ErrorCodes.SUBSCRIPTION_REQUIRED)) {
        // Could trigger upgrade modal here
        if (!silent && showErrorToast) {
          toast.info(appError.message, {
            icon: "👑",
            autoClose: 5000,
          });
        }
      } else {
        if (!silent && showErrorToast) {
          toast.error(errorMessage || appError.message);
        }
      }

      onError?.(appError);
      throw appError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

/**
 * Hook for form submissions with validation
 */
export const useFormSubmit = (schema, onSubmit) => {
  const { execute, loading, error } = useApiCall();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        // Validate with schema
        const validatedData = await schema.parseAsync(data);

        // Execute API call
        return await execute(() => onSubmit(validatedData), {
          successMessage: "Operation completed successfully",
        });
      } catch (error) {
        // Zod validation errors are handled by react-hook-form
        // Only re-throw if it's not a validation error
        if (error.name !== "ZodError") {
          throw error;
        }
        throw error;
      }
    },
    [schema, onSubmit, execute],
  );

  return {
    handleSubmit,
    loading,
    error,
  };
};
