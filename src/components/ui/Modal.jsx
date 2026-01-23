import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  centered = false,
  backdrop = true,
  keyboard = true,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  footer,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (keyboard && e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, keyboard, onClose]);

  const handleBackdropClick = (e) => {
    if (backdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSizeClass = () => {
    const sizeClasses = {
      sm: "modal-sm",
      md: "",
      lg: "modal-lg",
      xl: "modal-xl",
    };
    return sizeClasses[size] || "";
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal fade show d-block ${className}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className={`modal-dialog ${getSizeClass()} ${centered ? "modal-dialog-centered" : ""}`}
      >
        <div className="modal-content">
          {title && (
            <div className={`modal-header ${headerClassName}`}>
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
          )}

          <div className={`modal-body ${bodyClassName}`}>{children}</div>

          {footer && (
            <div className={`modal-footer ${footerClassName}`}>{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  centered: PropTypes.bool,
  backdrop: PropTypes.bool,
  keyboard: PropTypes.bool,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  footer: PropTypes.node,
};

export default Modal;
