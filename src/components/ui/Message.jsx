import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Message = ({
  type = "info",
  message,
  className = "",
  role,
  duration = 5000,
  dismissible = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message && duration && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const getAlertClasses = () => {
    const baseClasses = "alert d-flex align-items-center shadow-sm";

    const typeClasses = {
      success: "alert-success",
      error: "alert-danger",
      warning: "alert-warning",
      info: "alert-info",
    };

    const dismissibleClass = dismissible ? "alert-dismissible" : "";

    return `${baseClasses} ${typeClasses[type] || typeClasses.info} ${dismissibleClass} ${className}`;
  };

  const getIcon = () => {
    const iconClasses = "me-2 flex-shrink-0";

    switch (type) {
      case "success":
        return (
          <i
            className={`bi bi-check-circle-fill ${iconClasses}`}
            style={{ color: "#0f5132" }}
          ></i>
        );
      case "error":
        return (
          <i
            className={`bi bi-exclamation-triangle-fill ${iconClasses}`}
            style={{ color: "#842029" }}
          ></i>
        );
      case "warning":
        return (
          <i
            className={`bi bi-exclamation-triangle-fill ${iconClasses}`}
            style={{ color: "#664d03" }}
          ></i>
        );
      case "info":
      default:
        return (
          <i
            className={`bi bi-info-circle-fill ${iconClasses}`}
            style={{ color: "#055160" }}
          ></i>
        );
    }
  };

  if (!message || !isVisible) {
    return null;
  }

  return (
    <div
      className={getAlertClasses()}
      role={role || (type === "error" ? "alert" : "status")}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      {getIcon()}
      <div className="flex-grow-1">{message}</div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      )}
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(["error", "success", "info", "warning"]),
  message: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  duration: PropTypes.number,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Message;
