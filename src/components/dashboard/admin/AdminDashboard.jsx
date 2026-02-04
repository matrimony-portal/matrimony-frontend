import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAdminProfile } from "../../../services/admin/API_BASE_URL";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState({
    name: "Loading...",
    avatar: "https://i.pravatar.cc/40",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchAdminProfile();
      setAdminData(data);
    };
    loadProfile();
  }, []);

  return (
    <div className="admin-layout">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">💍 Bandan Admin</h2>
        </div>
        <div className="sidebar-stats">
          <div className="stat-item">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">25,890</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🚫</div>
            <div className="stat-info">
              <span className="stat-label">Blocked Users</span>
              <span className="stat-value">342</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value">₹145.6L</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Top Bar */}
        <header className="topbar">
          <h2>Admin Dashboard</h2>
          <div className="admin-profile">
            <Link to="profile" className="profile-link">
              <span>{adminData.name}</span>
              <img src={adminData.avatar} alt="admin" />
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card purple">
            <h4>Active Members</h4>
            <h2>12,540</h2>
            <span>+1.5%</span>
          </div>
          <div className="stat-card blue">
            <h4>Active Matches</h4>
            <h2>3,210</h2>
            <span>+2.2%</span>
          </div>
          <div className="stat-card yellow">
            <h4>Daily Matches</h4>
            <h2>560</h2>
            <span>+2.5%</span>
          </div>
          <div className="stat-card green">
            <h4>Success Stories</h4>
            <h2>51,200</h2>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="broadcast" className="action-btn broadcast">
            📢 Broadcast Message
          </Link>
          <Link to="add-event" className="action-btn event">
            🎉 Add Event
          </Link>
          <Link to="announcement" className="action-btn announcement">
            📣 Global Announcement
          </Link>
          <Link to="reports" className="action-btn reports">
            📊 View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
