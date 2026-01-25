import PropTypes from "prop-types";

/**
 * SettingItem - A reusable component for displaying a setting with label, description, and action control.
 * Used across Settings pages for consistent styling.
 */
const SettingItem = ({
  title,
  description,
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center p-3 bg-light rounded mb-2 ${className}`}
      {...props}
    >
      <div className="flex-grow-1 me-3">
        <h6 className="mb-1">{title}</h6>
        {description && <small className="text-muted">{description}</small>}
      </div>
      {children}
    </div>
  );
};

SettingItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SettingItem;
