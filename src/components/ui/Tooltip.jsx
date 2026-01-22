import { useState } from "react";
import PropTypes from "prop-types";

const Tooltip = ({
  children,
  content,
  placement = "top",
  trigger = "hover",
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "hover focus") {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" || trigger === "hover focus") {
      hideTooltip();
    }
  };

  const handleFocus = () => {
    if (trigger === "focus" || trigger === "hover focus") {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === "focus" || trigger === "hover focus") {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const getTooltipClasses = () => {
    const baseClasses = "tooltip bs-tooltip-auto fade";
    const showClass = isVisible ? "show" : "";
    const placementClass = `bs-tooltip-${placement}`;

    return `${baseClasses} ${placementClass} ${showClass}`;
  };

  const getArrowStyle = () => {
    switch (placement) {
      case "top":
        return { bottom: "-4px", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { top: "-4px", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { right: "-4px", top: "50%", transform: "translateY(-50%)" };
      case "right":
        return { left: "-4px", top: "50%", transform: "translateY(-50%)" };
      default:
        return {};
    }
  };

  const getTooltipStyle = () => {
    const baseStyle = {
      position: "absolute",
      zIndex: 1070,
      display: isVisible ? "block" : "none",
    };

    switch (placement) {
      case "top":
        return {
          ...baseStyle,
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
      case "bottom":
        return {
          ...baseStyle,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "8px",
        };
      case "left":
        return {
          ...baseStyle,
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px",
        };
      case "right":
        return {
          ...baseStyle,
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "8px",
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div
      className={`position-relative d-inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      {children}

      <div
        className={getTooltipClasses()}
        style={getTooltipStyle()}
        role="tooltip"
      >
        <div className="tooltip-arrow" style={getArrowStyle()}></div>
        <div className="tooltip-inner">{content}</div>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  trigger: PropTypes.oneOf(["hover", "focus", "click", "hover focus"]),
  className: PropTypes.string,
  delay: PropTypes.number,
};

export default Tooltip;
