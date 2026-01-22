import React from "react";

import { Link } from "react-router";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  <div className="quick-actions">
    <h3>Quick Actions</h3>

    <Link to="BroadcastMessage" className="quick-btn">
      📢 Broadcast Message
    </Link>

    <Link to="AddEvent" className="quick-btn">
      📅 Add New Event
    </Link>

    <Link to="/admin/announcement" className="quick-btn">
      🌍 Global Announcement
    </Link>

    <Link to="/admin/reports" className="quick-btn">
      🚨 Reports Counter (15)
    </Link>
  </div>;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">💍 Bandan Admin</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Users</li>
          <li>Verifications</li>
          <li>Matches</li>
          <li>Events</li>
          <li>Messaging</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
        <button className="logout">Logout</button>
      </aside>

      {/* Main */}
      <div className="main">
        {/* Top Bar */}
        <header className="topbar">
          <h2>Admin Dashboard</h2>
          <div className="admin-profile">
            <span>Admin</span>
            <img src="https://i.pravatar.cc/40" alt="admin" />
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

        {/* Charts (Placeholder) */}
        <div className="charts">
          <div className="chart-box">
            <h3>Matchmaking Stats</h3>
            <div className="fake-chart">📊 Graph Area</div>
          </div>

          <div className="chart-box">
            <h3>Conversion Rate</h3>
            <div className="fake-chart">⭕ 68%</div>
          </div>
        </div>

        {/* Table + Quick Actions */}
        <div className="bottom-section">
          <div className="table-box">
            <h3>Success Stories</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>101</td>
                  <td>Rahul</td>
                  <td>20</td>
                  <td>Active</td>
                  <td>Yes</td>
                  <td>
                    <button className="view">View</button>
                  </td>
                </tr>
                <tr>
                  <td>102</td>
                  <td>Priya</td>
                  <td>29</td>
                  <td>Pending</td>
                  <td>No</td>
                  <td>
                    <button className="verify">Verify</button>
                  </td>
                </tr>
                <tr>
                  <td>103</td>
                  <td>Amit</td>
                  <td>35</td>
                  <td>Active</td>
                  <td>Yes</td>
                  <td>
                    <button className="view">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button>📢 Broadcast Message</button>
            <button>📅 Add New Event</button>
            <button>🌍 Global Announcement</button>
            <button>🚨 Reports Counter (15)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
