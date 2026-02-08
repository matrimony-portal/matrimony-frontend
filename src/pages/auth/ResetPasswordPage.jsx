import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../styles/Login.css";
import { validatePassword } from "../../utils/validation";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("resetToken");
    if (!token) {
      toast.error("Invalid reset session. Please request a new reset link.");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password does not meet requirements";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const token = sessionStorage.getItem("resetToken");
    if (!token) {
      toast.error("Invalid reset session");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, formData.password);
      sessionStorage.removeItem("resetToken");
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div
            className="brand-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src="/assets/logo/logo.svg" alt="Logo" className="logo-icon" />
            <img
              src="/assets/logo/bandan.svg"
              alt="Bandan"
              className="logo-text"
            />
          </div>
          <div className="brand-content">
            <h1>Reset Your Password</h1>
            <p>Choose a strong password to secure your account.</p>
            <ul className="feature-list">
              <li>Use at least 8 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid common passwords</li>
            </ul>
          </div>
        </div>

        <div
          className="login-form-section"
          style={{ overflowY: "auto", padding: "2rem" }}
        >
          <div className="form-header">
            <h2>Set New Password</h2>
            <p>Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  style={{ paddingRight: "40px", width: "100%" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "0",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "error" : ""}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  style={{ paddingRight: "40px", width: "100%" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "0",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-btn"
              style={{ marginBottom: "2rem" }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
