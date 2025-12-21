import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow navbar-gradient">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/dashboard">
        <div className="logo d-flex align-items-center">
          <img
            src="/assets/logo/logo.svg"
            alt="Logo"
            className="logo-icon"
            style={{ height: "50px" }}
          />
          <img
            src="/assets/logo/bandan.svg"
            alt="Bandan"
            className="logo-text d-none d-md-inline"
            style={{ height: "40px" }}
          />
        </div>
      </a>

      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-nav flex-row align-items-center">
        <div className="nav-item text-nowrap">
          <button
            className="btn btn-link nav-link px-3 text-white text-decoration-none"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
