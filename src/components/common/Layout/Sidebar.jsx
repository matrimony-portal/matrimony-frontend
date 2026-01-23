// src/components/common/Layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, userType } = useAuth();
  const base = useDashboardBasePath();
  const { isFree, canMessage } = useUserCapabilities();

  // Define menu items based on user type
  const getMenuItems = () => {
    if (userType === "admin") {
      return [
        { path: base, icon: "bi-speedometer2", label: "Dashboard" },
        //{ path: `${base}/users`, icon: "bi-people", label: "Manage Users" },
        // { path: `${base}/organizers`, icon: "bi-person-badge", label: "Event Organizers" },
        //{ path: `${base}/success-stories`, icon: "bi-heart", label: "Success Stories" },
        //{ path: `${base}/reports`, icon: "bi-exclamation-triangle", label: "Reports" }
      ];
    }

    if (userType === "organizer") {
      return [
        { path: base, icon: "bi-house-door", label: "Dashboard" },
        {
          path: `${base}/events`,
          icon: "bi-calendar-event",
          label: "My Events",
        },
        {
          path: `${base}/create-event`,
          icon: "bi-plus-circle",
          label: "Create Event",
        },
        {
          path: `${base}/event-requests`,
          icon: "bi-inbox",
          label: "Event Requests",
        },
        // {
        //   path: `${base}/my-profile`,
        //   icon: "bi-person-circle",
        //   label: "My Profile",
        // },
        // {
        //   path: `${base}/blocked-users`,
        //   icon: "bi-x-circle",
        //   label: "Blocked Users",
        // },
        { path: `${base}/settings`, icon: "bi-gear", label: "Settings" },
      ];
    }

    // Default user menu items
    return [
      { path: base, icon: "bi-house-door", label: "Dashboard" },
      { path: `${base}/search`, icon: "bi-search", label: "Search Matches" },
      {
        path: `${base}/proposals`,
        icon: "bi-envelope-heart",
        label: "Proposals",
      },
      ...(canMessage
        ? [
            {
              path: `${base}/messages`,
              icon: "bi-chat-dots",
              label: "Messages",
            },
          ]
        : []),
      { path: `${base}/shortlist`, icon: "bi-star", label: "Shortlist" },
      { path: `${base}/events`, icon: "bi-calendar-event", label: "Events" },
      { path: `${base}/settings`, icon: "bi-gear", label: "Settings" },
      ...(isFree
        ? [
            {
              path: `${base}/subscription`,
              icon: "bi-credit-card",
              label: "View Plans",
            },
          ]
        : []),
    ];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1040,
          }}
        />
      )}

      <nav
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-collapsed"}`}
        style={{
          position: "fixed",
          top: "var(--navbar-height)",
          bottom: 0,
          left: 0,
          zIndex: 1041,
          marginTop: "0",
          background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
          transition: "width 0.3s ease-in-out",
          width: isOpen ? "225px" : "70px",
          height: "calc(100vh - var(--navbar-height))",
          //overflowY: "auto",
          //overflowX: "hidden",
        }}
      >
        {/* Toggle Button - visible on desktop only */}
        <button
          onClick={toggleSidebar}
          className="btn btn-link text-white d-none d-md-flex"
          style={{
            position: "absolute",
            right: "-15px",
            top: "20px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "#ae1700",
            border: "2px solid #fff",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            zIndex: 1042,
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          aria-label="Toggle sidebar"
        >
          <i
            className={`bi ${isOpen ? "bi-chevron-left" : "bi-chevron-right"}`}
            style={{ fontSize: "0.875rem" }}
          ></i>
        </button>

        <div className="pt-3">
          {isOpen && (
            <h6 className="sidebar-heading px-3 mt-2 mb-3 text-white-50 text-uppercase small">
              <span>
                Welcome!{" "}
                {user?.name || userType === "organizer"
                  ? "Organizer"
                  : userType === "admin"
                    ? "Admin"
                    : "User"}
              </span>
            </h6>
          )}
          <ul className="nav flex-column mb-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === base}
                  className={({ isActive }) =>
                    `nav-link text-white d-flex align-items-center ${isActive ? "active" : ""}`
                  }
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  style={({ isActive }) => ({
                    borderLeft: isActive
                      ? "3px solid #fff"
                      : "3px solid transparent",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    padding: isOpen ? "0.75rem 1.5rem" : "0.75rem 0",
                    justifyContent: isOpen ? "flex-start" : "center",
                    whiteSpace: "nowrap",
                  })}
                  title={!isOpen ? item.label : ""}
                >
                  <i
                    className={`bi ${item.icon}`}
                    style={{
                      fontSize: "1.25rem",
                      minWidth: "24px",
                      marginRight: isOpen ? "0.5rem" : "0",
                    }}
                  ></i>
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* CSS for responsive behavior */}
      <style>{`
        /* Custom scrollbar for sidebar */
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Mobile: Sidebar slides in from left */
        @media (max-width: 767.98px) {
          .sidebar {
            transform: translateX(-100%);
            width: 250px !important;
          }
          .sidebar.sidebar-open {
            transform: translateX(0);
          }
        }

        /* Desktop: Sidebar is always visible, just width changes */
        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0) !important;
          }
        }

        /* Smooth transitions */
        .sidebar {
          transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        /* Nav link hover effects */
        .sidebar .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .sidebar .nav-link.active:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        /* Tooltip for collapsed state */
        .nav-link[title]:not(.sidebar-open .nav-link):hover::after {
          content: attr(title);
          /*position: absolute;*/
          left: 70px;
          background: #2d0a0e;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 1050;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        /* Hide tooltip on mobile */
        @media (max-width: 767.98px) {
          .nav-link[title]:hover::after {
            display: none;
          }
        }

        /* Heading styling */
        .sidebar-heading {
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
