import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import "../../styles/Register.css";
import {
  checkPasswordStrength,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils/validation.js";

/**
 * RegisterPage - Multi-step registration (init → verify)
 * URL: /register
 */
const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Creation
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Step 2: Verification
    verificationCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Store the userId or email for verification and resend
  const [userIdentifier, setUserIdentifier] = useState("");

  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    strengthLevel: "weak",
    results: {},
  });

  const { registerInit, registerVerify, registerResend } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setGeneralError("");

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be 2-50 letters";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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

  const handleInitSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateStep1()) return;

    setLoading(true);
    await registerInit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    })
      .then(() => {
        // Store the identifier for verification
        setUserIdentifier(formData.email);
        setCurrentStep(2);
        setSuccessMessage("Verification code sent to your email!");
      })
      .catch((error) => {
        setGeneralError(
          error?.message || "Registration failed. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!formData.verificationCode) {
      setErrors({ verificationCode: "Please enter the verification code" });
      return;
    }

    setLoading(true);
    registerVerify(userIdentifier, formData.verificationCode)
      .then((response) => {
        if (response.success) {
          navigate("/login", {
            state: {
              message:
                "Registration successful! Please login with your credentials.",
            },
          });
        } else {
          // If no auto-login, redirect to login
          navigate("/login", {
            state: { message: "Verification successful! Please login." },
          });
        }
      })
      .catch((error) => {
        setGeneralError(
          error?.message || "Verification failed. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResendCode = async () => {
    setGeneralError("");
    setSuccessMessage("");

    if (!userIdentifier) {
      setUserIdentifier(formData.email);
    }

    setLoading(true);
    registerResend(userIdentifier)
      .then(() => {
        setSuccessMessage("New verification code sent to your email!");
      })
      .catch((error) => {
        setGeneralError(
          error?.message || "Failed to resend code. Please try again.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBack = () => {
    setCurrentStep(1);
    setSuccessMessage("");
    setGeneralError("");
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

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Progress Indicator */}
        <div className="progress-header">
          <div
            className="brand-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/logo/logo-black.svg"
              alt="Logo"
              className="logo-icon"
            />
            <img
              src="/assets/logo/bandan-black.svg"
              alt="Bandan"
              className="logo-text"
            />
          </div>
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <span>1</span>
              <p>Account</p>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <span>2</span>
              <p>Verify</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {/* Step 1: Registration Init */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="step-header">
                <h2>Create Your Account</h2>
                <p>Start your journey to find your perfect life partner</p>
              </div>

              <form onSubmit={handleInitSubmit} className="register-form">
                {generalError && (
                  <div className="error-alert">{generalError}</div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

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
                  />
                  <div className="help-text">
                    10-digit mobile number without country code
                  </div>
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
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
                  <div className="password-strength">
                    <div
                      className={`strength-bar ${getPasswordStrengthColor()}`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="password-requirements">
                    <p>Password must contain:</p>
                    <ul>
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
                            passwordStrength.results[key] ? "valid" : "invalid"
                          }
                        >
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? "error" : ""}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button type="submit" disabled={loading} className="next-btn">
                  {loading ? "Creating Account..." : "Continue to Verification"}
                </button>

                <div className="login-prompt">
                  <span>Already have an account? </span>
                  <Link to="/login">Login here</Link>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Verification */}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="step-header">
                <h2>Verify Your Email</h2>
                <p>Enter the verification code sent to {formData.email}</p>
              </div>

              <form onSubmit={handleVerifySubmit} className="register-form">
                {successMessage && (
                  <div className="success-alert">{successMessage}</div>
                )}

                {generalError && (
                  <div className="error-alert">{generalError}</div>
                )}

                <div className="form-group">
                  <label htmlFor="verificationCode">Verification Code</label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className={errors.verificationCode ? "error" : ""}
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                    autoFocus
                  />
                  {errors.verificationCode && (
                    <span className="error-message">
                      {errors.verificationCode}
                    </span>
                  )}
                </div>

                <button type="submit" disabled={loading} className="next-btn">
                  {loading ? "Verifying..." : "Verify & Complete Registration"}
                </button>

                <div className="resend-section">
                  <p>Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className="resend-btn"
                  >
                    {loading ? "Sending..." : "Resend Code"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBack}
                  className="back-link"
                >
                  ← Back to Registration
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
