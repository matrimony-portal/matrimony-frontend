import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
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
    <nav
      className="navbar navbar-dark sticky-top shadow navbar-gradient d-flex align-items-center"
      style={{ height: "60px", padding: "0 1rem" }}
    >
      {/* Mobile sidebar toggle */}
      <button
        className="navbar-toggler d-md-none border-0 p-2"
        type="button"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Logo */}
      <Link className="navbar-brand d-flex align-items-center m-0" to={base}>
        <img
          src="/assets/logo/logo.svg"
          alt="Logo"
          className="logo-icon"
          style={{ height: "40px" }}
        />
        <img
          src="/assets/logo/bandan.svg"
          alt="Bandan"
          className="logo-text d-none d-md-inline ms-2"
          style={{ height: "30px" }}
        />
      </Link>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3 ms-auto">
        {/* Notifications */}
        <NavLink
          to={`${base}/proposals`}
          className="text-white text-decoration-none"
          title="Notifications"
        >
          <i className="bi bi-bell fs-5"></i>
        </NavLink>

        {/* Messages */}
        <NavLink
          to={`${base}/messages`}
          className="text-white text-decoration-none"
          title="Messages"
        >
          <i className="bi bi-chat-dots fs-5"></i>
        </NavLink>

        {/* Profile Dropdown */}
        <div className="dropdown position-relative" ref={dropdownRef}>
          <img
            src="/src/assets/images/placeholder/user.png"
            alt="Profile"
            className="rounded-circle border border-2 border-white"
            onClick={toggleDropdown}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />

          {isDropdownOpen && (
            <div
              className="dropdown-menu dropdown-menu-end show shadow-lg"
              style={{ minWidth: "220px", right: 0, left: "auto" }}
            >
              {/* Header */}
              <NavLink
                to={`${base}/my-profile`}
                className="dropdown-header text-white text-decoration-none p-3"
                onClick={closeDropdown}
                style={{
                  background:
                    "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
                }}
              >
                <strong className="d-block">{user?.firstName || "User"}</strong>
              </NavLink>

              <div className="dropdown-divider m-0"></div>

              {/* Profile actions */}
              <NavLink
                to={`${base}/edit-profile`}
                className="dropdown-item py-2"
                onClick={closeDropdown}
              >
                Edit Profile
              </NavLink>
              <NavLink
                to={`${base}/manage-photos`}
                className="dropdown-item py-2"
                onClick={closeDropdown}
              >
                Manage Photos
              </NavLink>

              <div className="dropdown-divider m-0"></div>

              {/* Logout */}
              <div
                className="dropdown-item py-2 text-danger fw-medium"
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
        .dropdown-item:hover { background-color: #f8f9fa; color: #ae1700; }
        .dropdown-item.text-danger:hover { background-color: #fff5f5; color: #c82333; }
      `}</style>
    </nav>
  );
};

export default Navbar;
