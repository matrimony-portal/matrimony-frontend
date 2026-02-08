import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { getAdminById } from "../../../services/admin/AdminProfile";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState({
    name: "Loading...",
    avatar: "https://i.pravatar.cc/40",
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const totalUsers = data.totalUsers || 0;
      const activeUsers = data.activeUsers || 0;
      const inactiveUsers = data.inactiveUsers || 0;
      const blockedUsers = totalUsers - (activeUsers + inactiveUsers);

      setStats({
        totalUsers,
        activeUsers,
        blockedUsers,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const adminId = localStorage.getItem("adminId") || "1";
        const data = await getAdminById(adminId);
        console.log("Admin data:", data);
        setAdminData({
          name:
            `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
            "Admin User",
          avatar: data.avatar || "https://i.pravatar.cc/40",
        });
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
        setAdminData({
          name: "Admin User",
          avatar: "https://i.pravatar.cc/40",
        });
      }
      await fetchStats();
    };

    loadData();
  }, [fetchStats]);

  return (
    <div className="admin-layout">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">💍 Bandan Admin</h2>
        </div>
        <div className="sidebar-stats">
          <Link
            to="users"
            className="stat-item"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{stats.totalUsers}</span>
            </div>
          </Link>
          <Link
            to="users?tab=active"
            className="stat-item"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-label">Active Users</span>
              <span className="stat-value">{stats.activeUsers}</span>
            </div>
          </Link>
          <Link
            to="users?tab=blocked"
            className="stat-item"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="stat-icon">🚫</div>
            <div className="stat-info">
              <span className="stat-label">Blocked Users</span>
              <span className="stat-value">{stats.blockedUsers}</span>
            </div>
          </Link>
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
            <h2>{stats.activeUsers}</h2>
            <span>+1.5%</span>
          </div>
          <div className="stat-card blue">
            <h4>Active Matches</h4>
            <h2>12</h2>
            <span>+2.2%</span>
          </div>
          <div className="stat-card yellow">
            <h4>Daily Matches</h4>
            <h2>5</h2>
            <span>+2.5%</span>
          </div>
          <div className="stat-card green">
            <h4>Success Stories</h4>
            <h2>18</h2>
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
