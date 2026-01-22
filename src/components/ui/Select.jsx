import PropTypes from "prop-types";
import { useMemo } from "react";
import { generateId } from "../../utils/generateId.js";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  helpText,
  required = false,
  disabled = false,
  placeholder = "Select an option",
  className = "",
  id,
  name,
  size = "md",
  multiple = false,
  ...props
}) => {
  const selectId = useMemo(() => {
    if (id || name) return id || name;
    return generateId("select");
  }, [id, name]);

  const getSelectClasses = () => {
    const baseClasses = "form-select";
    const sizeClasses = {
      sm: "form-select-sm",
      md: "",
      lg: "form-select-lg",
    };
    const errorClass = error ? "is-invalid" : "";

    return `${baseClasses} ${sizeClasses[size]} ${errorClass} ${className}`;
  };

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        className={getSelectClasses()}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        multiple={multiple}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helpText
              ? `${selectId}-help`
              : undefined
        }
        {...props}
      >
        {!multiple && placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }

          return (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          );
        })}
      </select>

      {error && (
        <div id={`${selectId}-error`} className="invalid-feedback">
          {error}
        </div>
      )}

      {helpText && !error && (
        <div id={`${selectId}-help`} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
      }),
    ]),
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  multiple: PropTypes.bool,
};

export default Select;
