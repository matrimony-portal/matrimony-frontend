import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";

/**
 * ConfirmationModal - A reusable modal component to replace window.confirm() and alert().
 * Supports different variants (confirm, alert, danger) with appropriate styling.
 */
const ConfirmationModal = ({
  show,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  showCancel = true,
  loading = false,
}) => {
  const modalRef = useRef(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && show && !loading) {
        onCancel?.();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [show, onCancel, loading]);

  // Focus trap for accessibility
  useEffect(() => {
    if (show && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [show]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget && !loading) {
        onCancel?.();
      }
    },
    [onCancel, loading],
  );

  const handleConfirm = useCallback(() => {
    if (!loading) {
      onConfirm?.();
    }
  }, [onConfirm, loading]);

  const handleCancel = useCallback(() => {
    if (!loading) {
      onCancel?.();
    }
  }, [onCancel, loading]);

  const getButtonVariant = () => {
    const variants = {
      primary: "btn-primary",
      danger: "btn-danger",
      warning: "btn-warning",
      success: "btn-success",
      info: "btn-info",
    };
    return variants[variant] || variants.primary;
  };

  const getHeaderClass = () => {
    if (variant === "danger") return "text-danger";
    if (variant === "warning") return "text-warning";
    return "";
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleBackdropClick}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        ref={modalRef}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className={`modal-title ${getHeaderClass()}`}
              id="confirmation-modal-title"
            >
              {title}
            </h5>
            {!loading && (
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCancel}
              />
            )}
          </div>
          <div className="modal-body">
            {typeof message === "string" ? (
              <p className="mb-0">{message}</p>
            ) : (
              message
            )}
          </div>
          <div className="modal-footer">
            {showCancel && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              className={`btn ${getButtonVariant()}`}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "danger", "warning", "success", "info"]),
  showCancel: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ConfirmationModal;
