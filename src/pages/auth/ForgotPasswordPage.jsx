import { useState } from "react";
import { Link } from "react-router";
import { authService } from "../../services/authService.js";
import { validateEmail } from "../../utils/validation.js";

/**
 * ForgotPasswordPage - Request password reset
 * URL: /forgot-password
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="bg-white p-5 rounded-3 shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="h2 text-center mb-4">Forgot Password</h1>

        {!success ? (
          <>
            <p className="text-muted text-center mb-4">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${error ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error && (
                  <div className="invalid-feedback d-block">{error}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">
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
            <h5 className="text-success mb-3">Reset Link Sent!</h5>
            <p className="text-muted">
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your email and follow the instructions.
            </p>
            <p className="text-muted small mt-3">
              If you don't receive an email within a few minutes, check your
              spam folder or try again.
            </p>
          </div>
        )}

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

export default ForgotPasswordPage;
