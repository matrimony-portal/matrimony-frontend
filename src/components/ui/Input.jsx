import PropTypes from "prop-types";
import { useMemo } from "react";
import { generateId } from "../../utils/generateId.js";

const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helpText,
  required = false,
  disabled = false,
  className = "",
  id,
  name,
  size = "md",
  ...props
}) => {
  const inputId = useMemo(() => {
    if (id || name) return id || name;
    return generateId("input");
  }, [id, name]);

  const getInputClasses = () => {
    const baseClasses = "form-control";
    const sizeClasses = {
      sm: "form-control-sm",
      md: "",
      lg: "form-control-lg",
    };
    const errorClass = error ? "is-invalid" : "";

    return `${baseClasses} ${sizeClasses[size]} ${errorClass} ${className}`;
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <input
        type={type}
        id={inputId}
        name={name}
        className={getInputClasses()}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        aria-describedby={
          error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
        }
        {...props}
      />

      {error && (
        <div id={`${inputId}-error`} className="invalid-feedback">
          {error}
        </div>
      )}

      {helpText && !error && (
        <div id={`${inputId}-help`} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Input;
