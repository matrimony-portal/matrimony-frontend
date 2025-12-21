// src/components/common/Layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const menuItems = [
    { path: "/dashboard", icon: "bi-house-door", label: "Dashboard" },
    { path: "/dashboard/my-profile", icon: "bi-person", label: "My Profile" },
    {
      path: "/dashboard/edit-profile",
      icon: "bi-pencil-square",
      label: "Edit Profile",
    },
    {
      path: "/dashboard/manage-photos",
      icon: "bi-images",
      label: "Manage Photos",
    },
    { path: "/dashboard/search", icon: "bi-search", label: "Search Matches" },
    {
      path: "/dashboard/proposals",
      icon: "bi-envelope-heart",
      label: "Proposals",
    },
    { path: "/dashboard/messages", icon: "bi-chat-dots", label: "Messages" },
    { path: "/dashboard/shortlist", icon: "bi-star", label: "Shortlist" },
    {
      path: "/dashboard/blocked-users",
      icon: "bi-x-circle",
      label: "Blocked Users",
    },
    { path: "/dashboard/events", icon: "bi-calendar-event", label: "Events" },
    { path: "/dashboard/settings", icon: "bi-gear", label: "Settings" },
    {
      path: "/dashboard/feedback",
      icon: "bi-chat-left-text",
      label: "Feedback",
    },
  ];

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
          //position: 'fixed',
          //top: '56px', // Bootstrap navbar default height
          //bottom: 0,
          //left: 0,
          zIndex: 1041,
          background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
          overflowY: "auto", // Changed: allow scroll only when needed
          transition: "transform 0.3s ease-in-out",
          height: "calc(100vh - 56px)", // FIXED: Proper height calculation
        }}
      >
        <div className="pt-3">
          {" "}
          {/* REMOVED: position-sticky - causes scroll issues */}
          <h6 className="sidebar-heading px-3 mt-2 mb-3 text-white-50 text-uppercase">
            {" "}
            {/* REDUCED: mt-4 to mt-2 */}
            <span>Welcome! {user?.name || "User"}</span>
          </h6>
          <ul className="nav flex-column mb-0">
            {" "}
            {/* ADDED: mb-0 to remove bottom gap */}
            {menuItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
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
                    padding: "0.75rem 1.5rem", // Consistent padding
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
