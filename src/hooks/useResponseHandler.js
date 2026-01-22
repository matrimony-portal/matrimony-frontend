import { useState } from "react";
import { ResponseTypes } from "../utils/responseStructure";

export const useResponseHandler = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleResponse = (responseData) => {
    setResponse(responseData);

    // Auto-clear response after 5 seconds for non-error messages
    if (responseData.type !== ResponseTypes.ERROR) {
      setTimeout(() => setResponse(null), 5000);
    }
  };

  const clearResponse = () => setResponse(null);

  const executeAsync = async (asyncFunction) => {
    setLoading(true);
    setResponse(null);

    try {
      const result = await asyncFunction();
      handleResponse(result);
      return result;
    } catch (error) {
      const errorResponse = {
        success: false,
        type: ResponseTypes.ERROR,
        message: error.message || "An error occurred",
        statusCode: error.statusCode || 500,
      };
      handleResponse(errorResponse);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    response,
    handleResponse,
    clearResponse,
    executeAsync,
  };
};
