import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="container-fluid flex-grow-1 overflow-hidden">
        <div className="row h-100">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
