import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import "../../styles/Login.css";
import { validateEmail } from "../../utils/validation.js";

/**
 * LoginPage - User login form
 * URL: /login
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Please enter your password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        const redirectPath = location.state?.from?.pathname || "/dashboard";
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      const message = error?.message || "Login failed. Please try again.";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Branding Section */}
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
            <h1>Welcome Back!</h1>
            <p>
              Continue your journey to find your perfect life partner with
              Perfect Match.
            </p>
            <ul className="feature-list">
              <li>Access your profile and matches</li>
              <li>Connect with compatible partners</li>
              <li>Manage your proposals and chats</li>
              <li>Participate in exclusive events</li>
              <li>Get personalized recommendations</li>
            </ul>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="login-form-section">
          <div className="form-header">
            <h2>Login to Your Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            {loginError && (
              <div className="error-alert">
                <p>{loginError}</p>
              </div>
            )}

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="register-prompt">
              <span>Don't have an account? </span>
              <Link to="/register">Register now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
