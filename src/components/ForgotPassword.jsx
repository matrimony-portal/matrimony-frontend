import { Link } from "react-router";

const ForgotPassword = () => (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center p-4"
    style={{ background: "var(--bg)" }}
  >
    <div
      className="bg-white p-5 rounded-3 shadow w-100"
      style={{ maxWidth: "400px" }}
    >
      <h1 className="h2 text-center mb-4">Forgot Password</h1>
      <p className="text-muted text-center mb-4">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 py-3">
          Send Reset Link
        </button>
      </form>
      <div className="text-center mt-3">
        <Link
          to="/login"
          className="text-decoration-none"
          style={{ color: "var(--primary)" }}
        >
          Back to Login
        </Link>
      </div>
    </div>
  </div>
);

export default ForgotPassword;
