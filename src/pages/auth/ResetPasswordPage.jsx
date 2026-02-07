import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  checkPasswordStrength,
  validatePassword,
} from "../../utils/validation.js";

/**
 * ResetPasswordPage - Reset password with token from email
 * URL: /reset-password?token=<token>
 */
const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  const { resetPasswordVerify, resetPasswordConfirm } = useAuth();
  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    strengthLevel: "weak",
    results: {},
  });

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setGeneralError("Invalid or missing reset token.");
        setLoading(false);
        return;
      }

      try {
        await resetPasswordVerify(token);
        setIsValidToken(true);
      } catch (error) {
        setGeneralError(
          error?.message || "This reset link has expired or is invalid.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, resetPasswordVerify]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setGeneralError("");

    if (name === "newPassword") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = "Password does not meet requirements";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await resetPasswordConfirm(token, formData.newPassword);
      setSuccess(true);
    } catch (error) {
      setGeneralError(
        error?.message || "Failed to reset password. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.strengthLevel) {
      case "weak":
        return "strength-weak";
      case "medium":
        return "strength-medium";
      case "strong":
        return "strength-strong";
      default:
        return "";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (!isValidToken) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="bg-white p-5 rounded-3 shadow w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="text-center mb-4">
            <svg
              className="text-danger"
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          </div>
          <h3 className="text-center mb-3">Invalid Link</h3>
          <p className="text-muted text-center mb-4">
            {generalError ||
              "This password reset link has expired or is invalid."}
          </p>
          <div className="d-grid gap-2">
            <Link to="/forgot-password" className="btn btn-primary">
              Request New Link
            </Link>
            <Link to="/login" className="btn btn-outline-secondary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success
  if (success) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="bg-white p-5 rounded-3 shadow w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="text-center mb-4">
            <svg
              className="text-success"
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <h3 className="text-center mb-3">Password Reset!</h3>
          <p className="text-muted text-center mb-4">
            Your password has been successfully reset. You can now login with
            your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary w-100 py-3"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="bg-white p-5 rounded-3 shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="h3 text-center mb-4">Set New Password</h1>

        <p className="text-muted text-center mb-4">
          Please enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          {generalError && (
            <div className="alert alert-danger">{generalError}</div>
          )}

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label fw-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            {errors.newPassword && (
              <div className="invalid-feedback d-block">
                {errors.newPassword}
              </div>
            )}

            {/* Password strength indicator */}
            <div className="password-strength mt-2">
              <div
                className={`strength-bar ${getPasswordStrengthColor()}`}
                style={{
                  width: `${(passwordStrength.strength / 5) * 100}%`,
                  height: "4px",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <div className="password-requirements mt-2">
              <ul className="mb-0 ps-3">
                {[
                  { key: "lengthCheck", text: "Minimum 8 characters" },
                  { key: "lowerCheck", text: "One lowercase letter" },
                  { key: "upperCheck", text: "One uppercase letter" },
                  { key: "numberCheck", text: "One number" },
                  {
                    key: "specialCheck",
                    text: "One special character (@$!%*?&)",
                  },
                ].map(({ key, text }) => (
                  <li
                    key={key}
                    className={
                      passwordStrength.results[key]
                        ? "text-success"
                        : "text-muted small"
                    }
                    style={{
                      listStyle: passwordStrength.results[key]
                        ? "none"
                        : "disc",
                    }}
                  >
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3"
            disabled={submitting}
          >
            {submitting ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-decoration-none"
            style={{ color: "var(--primary)" }}
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
