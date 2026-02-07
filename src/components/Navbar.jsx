import { Link } from "react-router";
import Logo from "./common/Logo";

const NAVBAR_CONFIGS = {
  guest: {
    navLinks: [
      { href: "#home", label: "Home" },
      { href: "#search", label: "Search" },
      { href: "#features", label: "Features" },
      { href: "#stories", label: "Stories" },
      { href: "#contact", label: "Contact" },
    ],
    actions: [
      { to: "/login", label: "Login", className: "btn btn-outline-light" },
      { to: "/register", label: "Register", className: "btn btn-light" },
    ],
  },
  user: {
    navLinks: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/matches", label: "Matches" },
      { to: "/messages", label: "Messages" },
      { to: "/profile", label: "Profile" },
    ],
    actions: [
      { to: "/notifications", label: "🔔", className: "btn btn-outline-light" },
      {
        label: "👤 Account",
        className: "btn btn-outline-light dropdown-toggle",
        type: "dropdown",
      },
    ],
  },
  admin: {
    navLinks: [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/reports", label: "Reports" },
      { to: "/admin/settings", label: "Settings" },
    ],
    actions: [
      {
        to: "/admin/notifications",
        label: "🔔",
        className: "btn btn-outline-light",
      },
      {
        label: "⚙️ Admin",
        className: "btn btn-outline-light dropdown-toggle",
        type: "dropdown",
      },
    ],
  },
  organizer: {
    navLinks: [
      { to: "/organizer/dashboard", label: "Dashboard" },
      { to: "/organizer/events", label: "Events" },
      { to: "/organizer/attendees", label: "Attendees" },
      { to: "/organizer/analytics", label: "Analytics" },
    ],
    actions: [
      {
        to: "/organizer/create-event",
        label: "+ Event",
        className: "btn btn-success",
      },
      {
        label: "📊 Organizer",
        className: "btn btn-outline-light dropdown-toggle",
        type: "dropdown",
      },
    ],
  },
};

function Navbar({ userType = "guest", onLogout, sticky = false }) {
  const config = NAVBAR_CONFIGS[userType];

  const handleLogout = () => {
    if (onLogout) onLogout();
  };

  const navbarClasses = `navbar navbar-expand-lg navbar-dark ${sticky ? "sticky-top" : ""}`;

  return (
    <nav
      className={navbarClasses}
      style={{
        background: "linear-gradient(135deg, #6e0000 0%, #b30000 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center">
          <Logo size="md" />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            {config.navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                {link.to ? (
                  <Link to={link.to} className="nav-link">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center">
            {config.actions.map((action, index) => (
              <div key={index}>
                {action.to ? (
                  <Link to={action.to} className={`${action.className} btn-sm`}>
                    {action.label}
                  </Link>
                ) : action.type === "dropdown" ? (
                  <div className="dropdown">
                    <button
                      className={`${action.className} btn-sm`}
                      data-bs-toggle="dropdown"
                    >
                      {action.label}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      style={{
                        background: "rgba(248, 249, 250, 0.95)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                      }}
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" className="dropdown-item">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button className={`${action.className} btn-sm`}>
                    {action.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
