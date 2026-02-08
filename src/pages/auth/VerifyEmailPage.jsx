import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { authService } from "../../services/authService";
import "../../styles/Login.css";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        toast.error("Invalid verification link");
        return;
      }

      try {
        const response = await authService.verifyEmail(token);
        const newToken = response.data;
        sessionStorage.setItem("registrationToken", newToken);
        setStatus("success");
        toast.success("Email verified! Complete your registration.");
        setTimeout(() => {
          navigate("/register/complete");
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
            <h1>Email Verification</h1>
            <p>
              We're verifying your email address to ensure the security of your
              account.
            </p>
            <ul className="feature-list">
              <li>Secure email verification</li>
              <li>Complete your profile setup</li>
              <li>Start finding compatible matches</li>
              <li>Access exclusive features</li>
            </ul>
          </div>
        </div>

        <div className="login-form-section" style={{ textAlign: "center" }}>
          {status === "verifying" && (
            <>
              <div style={{ fontSize: "3rem", margin: "2rem 0" }}>⏳</div>
              <h2>Verifying Your Email</h2>
              <p style={{ color: "#666", marginTop: "1rem" }}>
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ fontSize: "4rem", margin: "2rem 0" }}>✅</div>
              <h2 style={{ color: "#4caf50" }}>Email Verified!</h2>
              <p style={{ color: "#666", marginTop: "1rem" }}>
                Your email has been successfully verified.
              </p>
              <p
                style={{
                  color: "#999",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginTop: "0.5rem",
                }}
              >
                Redirecting to complete your registration...
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
                onClick={() => navigate("/register")}
                className="login-btn"
                style={{ marginTop: "1.5rem" }}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
