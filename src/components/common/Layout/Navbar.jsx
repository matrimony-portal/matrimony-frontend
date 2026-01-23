import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const base = useDashboardBasePath();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-dark sticky-top p-0 shadow navbar-gradient">
      {/* Mobile sidebar toggle - positioned on the left */}
      <button
        className="navbar-toggler d-md-none"
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        style={{
          border: "none",
          padding: "0.5rem",
          marginLeft: "0.5rem",
          zIndex: 1,
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Logo - with proper spacing */}
      <Link className="navbar-brand me-0" to={base}>
        <div className="logo d-flex align-items-center">
          <img src="/assets/logo/logo.svg" alt="Logo" className="logo-icon" />
          <img
            src="/assets/logo/bandan.svg"
            alt="Bandan"
            className="logo-text d-none d-md-inline"
          />
        </div>
      </Link>

      {/* Right Section */}
      <div className="navbar-nav ms-auto flex-row align-items-center gap-3 pe-3">
        {/* Notifications */}
        <NavLink
          to={`${base}/proposals`}
          className="nav-icon-wrapper"
          title="Notifications"
        >
          <i className="bi bi-bell nav-icon"></i>
        </NavLink>

        {/* Messages */}
        <NavLink
          to={`${base}/messages`}
          className="nav-icon-wrapper"
          title="Messages"
        >
          <i className="bi bi-chat-dots nav-icon"></i>
        </NavLink>

        {/* Profile Dropdown */}
        <div
          className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}
          ref={dropdownRef}
        >
          <img
            src="/assets/images/male/rahul.png"
            alt="Profile"
            className="profile-avatar"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          />

          {isDropdownOpen && (
            <div
              className="profile-menu"
              style={{
                opacity: 1,
                transform: "translateY(0)",
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <NavLink
                to={`${base}/my-profile`}
                className="profile-header text-decoration-none"
                onClick={closeDropdown}
              >
                <strong>{user?.name || "User"}</strong>
                <span className="view-profile">View Profile</span>
              </NavLink>

              {/* Profile actions */}
              <div className="profile-section">
                <NavLink to={`${base}/edit-profile`} onClick={closeDropdown}>
                  Edit Profile
                </NavLink>
                <NavLink to={`${base}/manage-photos`} onClick={closeDropdown}>
                  Manage Photos
                </NavLink>
                <NavLink to={`${base}/settings`} onClick={closeDropdown}>
                  Theme
                </NavLink>
              </div>

              {/* Support */}
              <div className="profile-section">
                <NavLink to={`${base}/feedback`} onClick={closeDropdown}>
                  Send Feedback
                </NavLink>
                <NavLink to="/dashboard/help" onClick={closeDropdown}>
                  Help
                </NavLink>
              </div>

              {/* Logout */}
              <div
                className="profile-section logout"
                onClick={() => {
                  closeDropdown();
                  handleLogout();
                }}
                style={{ cursor: "pointer" }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .profile-dropdown {
          position: relative;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          transition: transform 0.2s ease;
        }

        .profile-avatar:hover {
          transform: scale(1.05);
        }

        .profile-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 220px;
          z-index: 1050;
          overflow: hidden;
          animation: dropdownFadeIn 0.2s ease;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-header {
          display: block;
          padding: 16px;
          background: linear-gradient(135deg, #5a0d14 0%, #ae1700 100%);
          color: white !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-header:hover {
          background: linear-gradient(135deg, #6a1d24 0%, #be2710 100%);
        }

        .profile-header strong {
          display: block;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .view-profile {
          font-size: 13px;
          opacity: 0.9;
        }

        .profile-section {
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .profile-section:last-child {
          border-bottom: none;
        }

        .profile-section a,
        .profile-section.logout {
          display: block;
          padding: 10px 16px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          transition: background-color 0.2s ease;
        }

        .profile-section a:hover,
        .profile-section.logout:hover {
          background-color: #f8f9fa;
          color: #ae1700;
        }

        .profile-section.logout {
          color: #dc3545;
          font-weight: 500;
        }

        .profile-section.logout:hover {
          background-color: #fff5f5;
          color: #c82333;
        }

        .nav-icon-wrapper {
          color: white;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .nav-icon-wrapper:hover {
          transform: scale(1.1);
        }

        .nav-icon {
          font-size: 20px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
