import PropTypes from "prop-types";
import Button from "./Button.jsx";

/**
 * EmptyState Component
 * Professional empty state with icon, message, and optional action
 */
export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div className={`empty-state text-center py-5 ${className}`}>
      <div className="empty-state-icon mb-3">
        <i className={`bi bi-${icon} display-1 text-muted`}></i>
      </div>
      {title && <h5 className="text-muted mb-2">{title}</h5>}
      {description && <p className="text-muted mb-4">{description}</p>}
      {action && (
        <Button
          variant={action.variant || "outline-primary"}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.icon && <i className={`bi bi-${action.icon} me-2`}></i>}
          {action.label}
        </Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  className: PropTypes.string,
};
