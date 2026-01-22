// src/components/common/Layout/Sidebar.jsx
import React, { useMemo } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, userType } = useAuth();

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

    // Default user menu items
    return [
      {
        id: "dashboard",
        path: "/dashboard",
        icon: "bi-house-door",
        label: "Dashboard",
      },
      {
        id: "my-profile",
        path: "/dashboard/my-profile",
        icon: "bi-person",
        label: "My Profile",
      },
      {
        id: "edit-profile",
        path: "/dashboard/edit-profile",
        icon: "bi-pencil-square",
        label: "Edit Profile",
      },
      {
        id: "manage-photos",
        path: "/dashboard/manage-photos",
        icon: "bi-images",
        label: "Manage Photos",
      },
      {
        id: "search",
        path: "/dashboard/search",
        icon: "bi-search",
        label: "Search Matches",
      },
      {
        id: "proposals",
        path: "/dashboard/proposals",
        icon: "bi-envelope-heart",
        label: "Proposals",
      },
      {
        id: "messages",
        path: "/dashboard/messages",
        icon: "bi-chat-dots",
        label: "Messages",
      },
      {
        id: "shortlist",
        path: "/dashboard/shortlist",
        icon: "bi-star",
        label: "Shortlist",
      },
      {
        id: "blocked-users",
        path: "/dashboard/blocked-users",
        icon: "bi-x-circle",
        label: "Blocked Users",
      },
      {
        id: "events",
        path: "/dashboard/events",
        icon: "bi-calendar-event",
        label: "Events",
      },
      {
        id: "settings",
        path: "/dashboard/settings",
        icon: "bi-gear",
        label: "Settings",
      },
      {
        id: "feedback",
        path: "/dashboard/feedback",
        icon: "bi-chat-left-text",
        label: "Feedback",
      },
    ];
  }, [userType]);

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
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1040,
          }}
        />
      )}

      <nav
        className={`col-md-3 col-lg-2 d-md-block sidebar ${isOpen ? "show" : "collapse"}`}
        style={{
          zIndex: 1041,
          background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
          overflowY: "auto",
          transition: "transform 0.3s ease-in-out",
          height: "calc(100vh - 56px)",
        }}
      >
        <div className="pt-3">
          <h6 className="sidebar-heading px-3 mt-2 mb-3 text-white-50 text-uppercase">
            <span>Welcome! {user?.name || userType || "User"}</span>
          </h6>
          <ul className="nav flex-column mb-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <NavLink
                  to={item.path}
                  end={
                    item.path === "/dashboard" ||
                    item.path === "/dashboard/admin" ||
                    item.path === "/dashboard/organizer"
                  }
                  className={({ isActive }) =>
                    `nav-link text-white ${isActive ? "active" : ""}`
                  }
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  style={({ isActive }) => ({
                    borderLeft: isActive
                      ? "3px solid #fff"
                      : "3px solid transparent",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    padding: "0.75rem 1.5rem",
                  })}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Sidebar;
