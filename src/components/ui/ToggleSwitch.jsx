import PropTypes from "prop-types";
import { useMemo } from "react";
import { generateId } from "../../utils/generateId.js";

/**
 * ToggleSwitch - A styled toggle switch component based on Bootstrap's form-switch.
 * Provides consistent styling and accessibility across the application.
 */
const ToggleSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  id,
  name,
  className = "",
  ...props
}) => {
  const switchId = useMemo(() => {
    if (id || name) return id || name;
    return generateId("toggle");
  }, [id, name]);

  const getSizeStyles = () => {
    const sizes = {
      sm: { width: "2rem", height: "1rem" },
      md: { width: "3rem", height: "1.5rem" },
      lg: { width: "4rem", height: "2rem" },
    };
    return sizes[size] || sizes.md;
  };

  const sizeStyles = getSizeStyles();

  return (
    <div className={`form-check form-switch ${className}`} {...props}>
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id={switchId}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{
          width: sizeStyles.width,
          height: sizeStyles.height,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        aria-checked={checked}
      />
      {label && (
        <label
          className="form-check-label ms-2"
          htmlFor={switchId}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default ToggleSwitch;
