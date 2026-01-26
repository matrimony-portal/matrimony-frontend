import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, NavLink } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout, user, userType } = useAuth();
  const base = useDashboardBasePath();
  const { isFree, canMessage, isPremium } = useUserCapabilities();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isOrganizer = userType === "organizer";
  const isAdmin = userType === "admin";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

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

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Get profile image based on user type
  const getProfileImage = () => {
    if (isOrganizer) return "/assets/images/event-organizer/profile-pic.jpg";
    if (isAdmin) return "/assets/images/admin/admin-avatar.png";
    return "/assets/images/male/rahul.png";
  };

  return (
    <nav className="navbar navbar-dark sticky-top p-0 shadow navbar-gradient dashboard-navbar">
      <div className="dashboard-navbar-container d-flex align-items-center w-100">
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
            flexShrink: 0,
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand dashboard-navbar-brand" to={base}>
          <div className="logo d-flex align-items-center">
            <img src="/assets/logo/logo.svg" alt="Logo" className="logo-icon" />
            <img
              src="/assets/logo/bandan.svg"
              alt="Bandan"
              className="logo-text d-none d-md-inline"
            />
          </div>
        </Link>

        <div className="navbar-nav dashboard-navbar-nav flex-row align-items-center gap-3 flex-shrink-0">
          {/* Notifications - hide for organizer/admin */}
          {!isOrganizer && !isAdmin && (
            <NavLink
              to={`${base}/proposals`}
              className="nav-icon-wrapper"
              title="Notifications"
            >
              <i className="bi bi-bell nav-icon"></i>
            </NavLink>
          )}

          {/* Messages - for users who can message and organizers */}
          {(canMessage || isOrganizer) && !isAdmin && (
            <NavLink
              to={`${base}/messages`}
              className="nav-icon-wrapper"
              title="Messages"
            >
              <i className="bi bi-chat-dots nav-icon"></i>
            </NavLink>
          )}

          {/* Event Requests - only for organizer */}
          {isOrganizer && (
            <NavLink
              to={`${base}/event-requests`}
              className="nav-icon-wrapper"
              title="Event Requests"
            >
              <i className="bi bi-inbox nav-icon"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3<span className="visually-hidden">pending requests</span>
              </span>
            </NavLink>
          )}

          {/* Profile Dropdown */}
          <div
            className={`profile-dropdown ${isDropdownOpen ? "active" : ""}`}
            ref={dropdownRef}
          >
            <div className="profile-avatar-wrapper">
              <img
                src={getProfileImage()}
                alt="Profile"
                className="profile-avatar"
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              />
              {isPremium && !isOrganizer && !isAdmin && (
                <span className="premium-badge-navbar">
                  <i className="bi bi-star-fill"></i>
                </span>
              )}
            </div>

            {isDropdownOpen && (
              <div className="profile-menu">
                {/* Header */}
                <NavLink
                  to={`${base}/${isOrganizer ? "my-profile" : "my-profile"}`}
                  className="profile-header text-decoration-none"
                  onClick={closeDropdown}
                >
                  <strong>{user?.name || "User"}</strong>
                  <span className="view-profile">View Profile</span>
                </NavLink>

                {/* Profile actions */}
                <div className="profile-section">
                  {isOrganizer ? (
                    <>
                      <NavLink
                        to={`${base}/edit-profile`}
                        onClick={closeDropdown}
                      >
                        Edit Profile
                      </NavLink>
                    </>
                  ) : isAdmin ? (
                    <>
                      <NavLink to={`${base}/users`} onClick={closeDropdown}>
                        Manage Users
                      </NavLink>
                      <NavLink
                        to={`${base}/organizers`}
                        onClick={closeDropdown}
                      >
                        Event Organizers
                      </NavLink>
                      <NavLink to={`${base}/reports`} onClick={closeDropdown}>
                        Reports
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to={`${base}/edit-profile`}
                        onClick={closeDropdown}
                      >
                        Edit Profile
                      </NavLink>
                      <NavLink
                        to={`${base}/manage-photos`}
                        onClick={closeDropdown}
                      >
                        Manage Photos
                      </NavLink>
                    </>
                  )}
                </div>

                {/* Support */}
                <div className="profile-section">
                  <NavLink to={`${base}/feedback`} onClick={closeDropdown}>
                    Send Feedback
                  </NavLink>
                  {/* <NavLink to="/feedback" onClick={closeDropdown}>
                  Public Feedback
                </NavLink> */}
                  <NavLink to={`${base}/contact`} onClick={closeDropdown}>
                    Contact Us/Help
                  </NavLink>
                </div>

                {/* Subscription Info - for premium users */}
                {isPremium && !isOrganizer && !isAdmin && (
                  <div className="profile-section">
                    <div
                      className="px-3 py-2"
                      style={{
                        borderTop: "1px solid #f0f0f0",
                        borderBottom: "1px solid #f0f0f0",
                        backgroundColor: "#fffbf0",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="small text-muted">Current Plan</span>
                        <span className="badge bg-warning text-dark small">
                          {user?.subscriptionTier === "premium"
                            ? "Gold"
                            : user?.subscriptionTier || "Premium"}
                        </span>
                      </div>
                      {user?.subscriptionExpiry && (
                        <div className="small text-muted">
                          Expires:{" "}
                          {new Date(user.subscriptionExpiry).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </div>
                      )}
                      <NavLink
                        to={`${base}/subscription`}
                        onClick={closeDropdown}
                        className="small text-primary text-decoration-none mt-1 d-block"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Manage Subscription →
                      </NavLink>
                    </div>
                  </div>
                )}

                {/* Upgrade - only for free users */}
                {isFree && !isOrganizer && !isAdmin && (
                  <div className="profile-section">
                    <NavLink
                      to={`${base}/subscription`}
                      onClick={closeDropdown}
                    >
                      View Plans
                    </NavLink>
                  </div>
                )}

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
      </div>

      <style>{`
        /* Dashboard Navbar Specific Styles - Scoped to avoid homepage conflicts */
        .dashboard-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0;
          height: var(--navbar-height);
          min-height: var(--navbar-height);
        }

        .dashboard-navbar-container {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .dashboard-navbar .dashboard-navbar-brand {
          display: flex;
          align-items: center;
          margin-right: auto;
          flex-shrink: 0;
          padding: 0 1rem;
        }

        .dashboard-navbar .dashboard-navbar-nav {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: auto;
          flex-shrink: 0;
          padding: 0;
          margin: 0;
          padding-right: 1rem;
        }

        .dashboard-navbar .dashboard-navbar-nav > * {
          margin: 0;
        }

        .dashboard-navbar .logo-icon {
          height: 35px;
          width: auto;
        }

        .dashboard-navbar .logo-text {
          height: 28px;
          width: auto;
          margin-left: 6px;
        }

        /* Ensure proper spacing on mobile */
        @media (max-width: 767.98px) {
          .dashboard-navbar .dashboard-navbar-brand {
            padding: 0 0.5rem;
          }

          .dashboard-navbar .dashboard-navbar-nav {
            gap: 0.5rem;
            padding-right: 0.5rem;
          }
        }

        /* Profile dropdown styles */
        .profile-dropdown {
          position: relative;
        }

        .profile-avatar-wrapper {
          position: relative;
          display: inline-block;
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

        .premium-badge-navbar {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          color: #333;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
          font-size: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }

        .premium-badge-navbar i {
          font-size: 10px;
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
          animation: dropdown-fade-in 0.2s ease;
        }

        @keyframes dropdown-fade-in {
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
          color: rgba(255, 255, 255, 0.95) !important;
          display: block;
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
          position: relative;
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
