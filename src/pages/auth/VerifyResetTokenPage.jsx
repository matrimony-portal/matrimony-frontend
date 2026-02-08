import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../../services/authService.js";
import "../../styles/Login.css";

const VerifyResetTokenPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        toast.error("Invalid reset link");
        return;
      }

      try {
        const response = await authService.verifyResetToken(token);
        sessionStorage.setItem("resetToken", response.data);
        setStatus("success");
        toast.success("Token verified! Set your new password.");
        setTimeout(() => {
          navigate("/reset-password");
        }, 2000);
      } catch (error) {
        setStatus("error");
        toast.error(error.message || "Verification failed");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

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
            <h1>Password Reset</h1>
            <p>
              We're verifying your reset link to ensure the security of your
              account.
            </p>
            <ul className="feature-list">
              <li>Secure token verification</li>
              <li>Set a new strong password</li>
              <li>Regain access to your account</li>
              <li>Continue your journey</li>
            </ul>
          </div>
        </div>

        <div className="login-form-section" style={{ textAlign: "center" }}>
          {status === "verifying" && (
            <>
              <div style={{ fontSize: "3rem", margin: "2rem 0" }}>⏳</div>
              <h2>Verifying Reset Link</h2>
              <p style={{ color: "#666", marginTop: "1rem" }}>
                Please wait while we verify your password reset link...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ fontSize: "4rem", margin: "2rem 0" }}>✅</div>
              <h2 style={{ color: "#4caf50" }}>Link Verified!</h2>
              <p style={{ color: "#666", marginTop: "1rem" }}>
                Your reset link has been verified.
              </p>
              <p
                style={{
                  color: "#999",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginTop: "0.5rem",
                }}
              >
                Redirecting to set new password...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div style={{ fontSize: "4rem", margin: "2rem 0" }}>❌</div>
              <h2 style={{ color: "#f44336" }}>Verification Failed</h2>
              <p style={{ color: "#666", marginTop: "1rem" }}>
                The link may be invalid or expired.
              </p>
              <button
                onClick={() => navigate("/forgot-password")}
                className="login-btn"
                style={{ marginTop: "1.5rem" }}
              >
                Request New Link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyResetTokenPage;
