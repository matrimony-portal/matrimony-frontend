import PropTypes from "prop-types";

const Spinner = ({
  size = 20,
  className = "",
  ariaLabel = "Loading...",
  variant = "primary",
  type = "border",
}) => {
  const getSpinnerClasses = () => {
    const baseClasses = type === "border" ? "spinner-border" : "spinner-grow";

    const sizeClasses = {
      sm: `${baseClasses}-sm`,
      md: "",
      lg: `${baseClasses}-lg`,
    };

    const variantClasses = {
      primary: "text-danger", // Matrimony red theme
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      info: "text-info",
      light: "text-light",
      dark: "text-dark",
    };

    const sizeClass = typeof size === "string" ? sizeClasses[size] : "";
    const variantClass = variantClasses[variant] || variantClasses.primary;

    return `${baseClasses} ${sizeClass} ${variantClass} ${className}`;
  };

  const getInlineStyles = () => {
    if (typeof size === "number") {
      return {
        width: `${size}px`,
        height: `${size}px`,
      };
    }
    return {};
  };

  return (
    <div
      className={getSpinnerClasses()}
      style={getInlineStyles()}
      role="status"
      aria-label={ariaLabel}
    >
      <span className="visually-hidden">{ariaLabel}</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["sm", "md", "lg"]),
  ]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  type: PropTypes.oneOf(["border", "grow"]),
};

export default Spinner;
