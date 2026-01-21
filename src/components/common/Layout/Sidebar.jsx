// src/components/common/Layout/Sidebar.jsx
import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, userType } = useAuth();
  const base = useDashboardBasePath();

  // Memoized menu items based on user role
  const menuItems = useMemo(() => {
    if (userType === "admin") {
      return [
        {
          id: "admin-dashboard",
          path: "/dashboard/admin",
          icon: "bi-speedometer2",
          label: "Dashboard",
        },
        {
          id: "manage-users",
          path: "/dashboard/admin/manage-users",
          icon: "bi-people",
          label: "Manage Users",
        },
        {
          id: "manage-organizers",
          path: "/dashboard/admin/manage-organizers",
          icon: "bi-person-badge",
          label: "Event Organizers",
        },
        {
          id: "manage-success-stories",
          path: "/dashboard/admin/manage-success-stories",
          icon: "bi-heart",
          label: "Success Stories",
        },
        {
          id: "reports-complaints",
          path: "/dashboard/admin/reports-complaints",
          icon: "bi-exclamation-triangle",
          label: "Reports & Complaints",
        },
      ];
    }

    if (userType === "organizer") {
      return [
        {
          id: "organizer-dashboard",
          path: "/dashboard/organizer",
          icon: "bi-speedometer2",
          label: "Dashboard",
        },
        {
          id: "organizer-events",
          path: "/dashboard/organizer/events",
          icon: "bi-calendar-event",
          label: "My Events",
        },
        {
          id: "create-event",
          path: "/dashboard/organizer/create-event",
          icon: "bi-plus-circle",
          label: "Create Event",
        },
        {
          id: "organizer-profile",
          path: "/dashboard/organizer/profile",
          icon: "bi-person",
          label: "Profile",
        },
        {
          id: "organizer-settings",
          path: "/dashboard/organizer/settings",
          icon: "bi-gear",
          label: "Settings",
        },
      ];
    }

    // Default user menu items - use base path for dynamic routing
    return [
      { path: base, icon: "bi-house-door", label: "Dashboard" },
      {
        path: `${base}/search`,
        icon: "bi-search",
        label: "Search Matches",
      },
      {
        path: `${base}/proposals`,
        icon: "bi-envelope-heart",
        label: "Proposals",
      },
      { path: `${base}/messages`, icon: "bi-chat-dots", label: "Messages" },
      { path: `${base}/shortlist`, icon: "bi-star", label: "Shortlist" },
      {
        path: `${base}/events`,
        icon: "bi-calendar-event",
        label: "Events",
      },
      { path: `${base}/settings`, icon: "bi-gear", label: "Settings" },
    ];
  }, [userType, base]);

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
              <span>Welcome! {user?.name || userType || "User"}</span>
            </h6>
          )}
          <ul className="nav flex-column mb-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.id || item.path}>
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

        /* Tooltip for collapsed state */
        .nav-link[title]:not(.sidebar-open .nav-link):hover::after {
          content: attr(title);
          position: absolute;
          left: 70px;
          background: #2d0a0e;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          white-space: nowrap;
          z-index: 1050;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        /* Hide tooltip on mobile and when expanded */
        @media (max-width: 767.98px) {
          .nav-link[title]:hover::after {
            display: none;
          }
        }

        .sidebar-open .nav-link[title]:hover::after {
          display: none;
        }
      `}</style>
    </>
  );
};
export default Sidebar;
