// src/hooks/useConfirmation.js
import { useState, useCallback } from "react";

/**
 * Custom hook for managing confirmation modal state.
 * Provides a clean API for showing confirmation dialogs.
 *
 * @example
 * const { showConfirmation, confirmationProps, confirm, alert } = useConfirmation();
 *
 * // For confirmation dialogs:
 * const handleDelete = async () => {
 *   const confirmed = await confirm({
 *     title: "Delete Item",
 *     message: "Are you sure you want to delete this item?",
 *     variant: "danger"
 *   });
 *   if (confirmed) {
 *     // Perform delete action
 *   }
 * };
 *
 * // For alert dialogs:
 * const handleSuccess = () => {
 *   alert({ title: "Success", message: "Item was deleted successfully!" });
 * };
 *
 * // In JSX:
 * <ConfirmationModal {...confirmationProps} />
 */
const useConfirmation = () => {
  const [modalState, setModalState] = useState({
    show: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "primary",
    showCancel: true,
    loading: false,
    onConfirm: null,
    onCancel: null,
  });

  const showConfirmation = useCallback(
    ({
      title = "Confirm Action",
      message,
      confirmText = "Confirm",
      cancelText = "Cancel",
      variant = "primary",
      showCancel = true,
    }) => {
      return new Promise((resolve) => {
        setModalState({
          show: true,
          title,
          message,
          confirmText,
          cancelText,
          variant,
          showCancel,
          loading: false,
          onConfirm: () => {
            setModalState((prev) => ({ ...prev, show: false }));
            resolve(true);
          },
          onCancel: () => {
            setModalState((prev) => ({ ...prev, show: false }));
            resolve(false);
          },
        });
      });
    },
    [],
  );

  /**
   * Show a confirmation dialog and return a promise that resolves to true/false
   */
  const confirm = useCallback(
    (options) => showConfirmation({ showCancel: true, ...options }),
    [showConfirmation],
  );

  /**
   * Show an alert dialog (no cancel button) that resolves when dismissed
   */
  const alert = useCallback(
    (options) =>
      showConfirmation({
        showCancel: false,
        confirmText: "OK",
        ...options,
      }),
    [showConfirmation],
  );

  /**
   * Show a danger confirmation dialog
   */
  const confirmDanger = useCallback(
    (options) =>
      showConfirmation({
        variant: "danger",
        confirmText: "Delete",
        ...options,
      }),
    [showConfirmation],
  );

  const setLoading = useCallback((loading) => {
    setModalState((prev) => ({ ...prev, loading }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, show: false }));
  }, []);

  // Props to spread onto ConfirmationModal
  const confirmationProps = {
    show: modalState.show,
    title: modalState.title,
    message: modalState.message,
    confirmText: modalState.confirmText,
    cancelText: modalState.cancelText,
    variant: modalState.variant,
    showCancel: modalState.showCancel,
    loading: modalState.loading,
    onConfirm: modalState.onConfirm,
    onCancel: modalState.onCancel,
  };

  return {
    showConfirmation,
    confirm,
    alert,
    confirmDanger,
    confirmationProps,
    setLoading,
    closeModal,
  };
};

export default useConfirmation;
