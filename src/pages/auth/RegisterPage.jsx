import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../styles/Login.css";
import { validateEmail } from "../../utils/validation";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await authService.startRegistration(email);
      toast.success("Verification email sent! Check your inbox.");
      navigate("/login", {
        state: { message: "Please check your email to verify your account" },
      });
    } catch (error) {
      toast.error(error?.message || "Registration failed");
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
            <h1>Join Bandan</h1>
            <p>Start your journey to find your perfect life partner</p>
            <ul className="feature-list">
              <li>Create your profile</li>
              <li>Find compatible matches</li>
              <li>Connect with potential partners</li>
              <li>Attend exclusive events</li>
            </ul>
          </div>
        </div>

        <div className="login-form-section">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Enter your email to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={error ? "error" : ""}
                placeholder="Enter your email"
                required
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Sending..." : "Send Verification Email"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="register-prompt">
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
