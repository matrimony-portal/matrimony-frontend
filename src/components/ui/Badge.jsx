import PropTypes from "prop-types";

const Badge = ({
  children,
  variant = "primary",
  pill = false,
  className = "",
  ...props
}) => {
  const getBadgeClasses = () => {
    const baseClasses = "badge";
    const pillClass = pill ? "rounded-pill" : "";

    const variantClasses = {
      primary: "bg-danger", // Matrimony red theme
      secondary: "bg-secondary",
      success: "bg-success",
      warning: "bg-warning",
      info: "bg-info",
      light: "bg-light text-dark",
      dark: "bg-dark",
      outline: "border border-danger text-danger bg-transparent",
    };

    return `${baseClasses} ${variantClasses[variant]} ${pillClass} ${className}`;
  };

  return (
    <span className={getBadgeClasses()} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "info",
    "light",
    "dark",
    "outline",
  ]),
  pill: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
