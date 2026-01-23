import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService.js";
import "../../../styles/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardStats = await adminService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      id: "total-users",
      icon: "👥",
      number: stats?.totalUsers?.toLocaleString() || "0",
      label: "Total Users",
    },
    {
      id: "active-users",
      icon: "✅",
      number: stats?.activeUsers?.toLocaleString() || "0",
      label: "Active Users",
    },
    {
      id: "premium-users",
      icon: "⭐",
      number: stats?.premiumUsers?.toLocaleString() || "0",
      label: "Premium Users",
    },
    {
      id: "active-organizers",
      icon: "🎯",
      number: stats?.activeOrganizers || "0",
      label: "Active Organizers",
    },
    {
      id: "total-events",
      icon: "📅",
      number: stats?.totalEvents || "0",
      label: "Total Events",
    },
    {
      id: "pending-reports",
      icon: "⚠️",
      number: stats?.pendingReports || "0",
      label: "Pending Reports",
    },
  ];

  const recentActivities = [
    {
      id: "activity-1",
      icon: "✓",
      iconClass: "icon-green",
      title: "New user registered:",
      detail: "Priya Sharma",
      time: "5 minutes ago",
    },
    {
      id: "activity-2",
      icon: "📅",
      iconClass: "icon-blue",
      title: "New event created:",
      detail: "Speed Dating - Mumbai",
      time: "15 minutes ago",
    },
    {
      id: "activity-3",
      icon: "⚠️",
      iconClass: "icon-yellow",
      title: "New report submitted:",
      detail: "Inappropriate behavior",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h1 className="h3 text-dark mb-2">Dashboard Analytics</h1>
        <p className="text-muted mb-0">Overview of platform statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="row g-3 mb-4">
        {statsCards.map((stat) => (
          <div key={stat.id} className="col-6 col-lg-4 col-xl-2">
            <div className="card h-100 text-center admin-stat-card">
              <div className="card-body">
                <div className="fs-1 mb-2">{stat.icon}</div>
                <div className="h4 text-primary fw-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-muted small">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    (window.location.href = "/dashboard/admin/manage-users")
                  }
                >
                  <i className="bi bi-people me-1"></i>Manage Users
                </button>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    (window.location.href = "/dashboard/admin/add-organizer")
                  }
                >
                  <i className="bi bi-plus-circle me-1"></i>Add Organizer
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/admin/reports-complaints")
                  }
                >
                  <i className="bi bi-exclamation-triangle me-1"></i>View
                  Reports
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() =>
                    (window.location.href =
                      "/dashboard/admin/add-success-story")
                  }
                >
                  <i className="bi bi-heart me-1"></i>Add Success Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-2 mb-3">
                User Growth
              </h5>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                style={{ height: "250px" }}
              >
                📈 User Growth Chart
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-2 mb-3">
                Event Participation
              </h5>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                style={{ height: "250px" }}
              >
                📊 Event Stats Chart
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-2 mb-3">
                Monthly Revenue
              </h5>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                style={{ height: "250px" }}
              >
                💰 Revenue Chart
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title border-bottom pb-2 mb-3">
                User Demographics
              </h5>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                style={{ height: "250px" }}
              >
                🥧 Demographics Chart
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title border-bottom pb-2 mb-3">
            Recent Activity
          </h5>
          {recentActivities.map((activity) => (
            <div key={activity.id} className="d-flex gap-3 py-2 border-bottom">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 admin-activity-icon ${activity.iconClass}`}
                style={{ width: "40px", height: "40px" }}
              >
                {activity.icon}
              </div>
              <div className="flex-grow-1">
                <p className="mb-1">
                  <strong>{activity.title}</strong> {activity.detail}
                </p>
                <small className="text-muted">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
