import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../styles/Login.css";
import {
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils/validation";

const CompleteRegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "9876543210",
    password: "Test@123",
    confirmPassword: "Test@123",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("registrationToken");
    if (!token) {
      toast.error(
        "Invalid registration session. Please verify your email again.",
      );
      navigate("/register");
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
    if (!validateName(formData.firstName)) {
      newErrors.firstName = "First name must be 2-50 characters";
    }
    if (!validateName(formData.lastName)) {
      newErrors.lastName = "Last name must be 2-50 characters";
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
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

    const token = sessionStorage.getItem("registrationToken");
    if (!token) {
      toast.error("Invalid registration session");
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      await authService.completeRegistration(token, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        password: formData.password,
        role: "USER",
      });
      sessionStorage.removeItem("registrationToken");
      toast.success("Registration completed! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
            <h1>Almost There!</h1>
            <p>
              Complete your profile to start your journey to finding your
              perfect match.
            </p>
            <ul className="feature-list">
              <li>Create your personalized profile</li>
              <li>Get matched with compatible partners</li>
              <li>Connect and communicate securely</li>
              <li>Join exclusive matrimony events</li>
            </ul>
          </div>
        </div>

        <div
          className="login-form-section"
          style={{ overflowY: "auto", padding: "2rem" }}
        >
          <div className="form-header">
            <h2>Complete Your Registration</h2>
            <p>Fill in your details to create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "error" : ""}
                placeholder="Enter your first name"
                autoComplete="given-name"
                required
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "error" : ""}
                placeholder="Enter your last name"
                autoComplete="family-name"
                required
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
                placeholder="10-digit mobile number"
                maxLength="10"
                autoComplete="tel"
                required
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
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
                  placeholder="Enter your password"
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
              <label htmlFor="confirmPassword">Confirm Password</label>
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
                  placeholder="Confirm your password"
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
              {loading ? "Completing..." : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistrationPage;
