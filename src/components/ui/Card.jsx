import PropTypes from "prop-types";

const Card = ({
  children,
  className = "",
  header,
  footer,
  variant = "default",
  shadow = true,
  ...props
}) => {
  const getCardClasses = () => {
    const baseClasses = "card";
    const shadowClass = shadow ? "shadow-sm" : "";
    const variantClasses = {
      default: "",
      primary: "border-danger",
      secondary: "border-secondary",
      success: "border-success",
      warning: "border-warning",
      info: "border-info",
    };

    return `${baseClasses} ${variantClasses[variant]} ${shadowClass} ${className}`;
  };

  return (
    <div className={getCardClasses()} {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "info",
  ]),
  shadow: PropTypes.bool,
};

export default Card;
