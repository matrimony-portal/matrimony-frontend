// src/components/common/Layout/Layout.jsx
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default: open on desktop
  const location = useLocation();
  const mainRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Reset scroll position for the dashboard content container on navigation
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="container-fluid flex-grow-1 overflow-hidden p-0 m-1">
        <div className="row h-100 g-0">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            ref={mainRef}
            className={`main-content px-md-4 ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}
            style={{
              transition:
                "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <style>{`
        /* Main content responsive adjustments */
        .main-content {
          padding-top: 1rem;
          overflow-y: auto;
          height: calc(100vh - var(--navbar-height, 60px));
          width: 100%;
        }

        /* Desktop: Adjust based on sidebar state */
        @media (min-width: 768px) {
          .main-content {
            padding-top: 1.5rem;
          }

          .main-content.sidebar-open {
            margin-left: 225px;
            width: calc(100% - 225px);
          }

          .main-content.sidebar-collapsed {
            margin-left: 70px;
            width: calc(100% - 70px);
          }
        }

        /* Mobile: Full width, no margin */
        @media (max-width: 767.98px) {
          .main-content {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }

        /* Remove Bootstrap column classes interference */
        @media (min-width: 768px) {
          .main-content.col-md-9,
          .main-content.col-lg-10 {
            flex: none;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
