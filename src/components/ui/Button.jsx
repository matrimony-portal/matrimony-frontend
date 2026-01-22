import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  iconLeft,
  iconRight,
  loadingText,
  className = "",
  type = "button",
  ...props
}) => {
  const getButtonClasses = () => {
    const baseClasses =
      "btn d-inline-flex align-items-center justify-content-center fw-semibold text-decoration-none";

    const variantClasses = {
      primary: "btn-danger", // Uses matrimony red gradient from custom.css
      secondary: "btn-outline-secondary",
      success: "btn-success",
      warning: "btn-warning",
      danger: "btn-outline-danger",
      light: "btn-light",
      dark: "btn-dark",
      outline: "btn-outline-primary",
    };

    const sizeClasses = {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    };

    return `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size]} ${className}`;
  };

  const isDisabled = isLoading || disabled;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={getButtonClasses()}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            size={size === "sm" ? 16 : size === "lg" ? 24 : 20}
            className="me-2"
          />
          {loadingText || "Processing..."}
        </>
      ) : (
        <>
          {iconLeft && <span className="me-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ms-2">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "light",
    "dark",
    "outline",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  loadingText: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
