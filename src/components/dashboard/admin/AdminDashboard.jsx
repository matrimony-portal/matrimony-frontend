import React from "react";

import { Link } from "react-router";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-layout">
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

        {/* Charts */}
        <div className="charts">
          <div className="chart-box">
            <h3>Matchmaking Stats</h3>
            <div className="chart-container">
              <div className="bar-chart">
                <div className="bar bar-red" style={{ height: "80%" }}>
                  <span className="bar-label">Jan</span>
                  <span className="bar-value">320</span>
                </div>
                <div className="bar bar-orange" style={{ height: "65%" }}>
                  <span className="bar-label">Feb</span>
                  <span className="bar-value">260</span>
                </div>
                <div className="bar bar-yellow" style={{ height: "90%" }}>
                  <span className="bar-label">Mar</span>
                  <span className="bar-value">360</span>
                </div>
                <div className="bar bar-green" style={{ height: "75%" }}>
                  <span className="bar-label">Apr</span>
                  <span className="bar-value">300</span>
                </div>
                <div className="bar bar-blue" style={{ height: "95%" }}>
                  <span className="bar-label">May</span>
                  <span className="bar-value">380</span>
                </div>
                <div className="bar bar-purple" style={{ height: "85%" }}>
                  <span className="bar-label">Jun</span>
                  <span className="bar-value">340</span>
                </div>
                <div className="bar bar-pink" style={{ height: "70%" }}>
                  <span className="bar-label">Jul</span>
                  <span className="bar-value">280</span>
                </div>
                <div className="bar bar-teal" style={{ height: "88%" }}>
                  <span className="bar-label">Aug</span>
                  <span className="bar-value">352</span>
                </div>
                <div className="bar bar-indigo" style={{ height: "92%" }}>
                  <span className="bar-label">Sep</span>
                  <span className="bar-value">368</span>
                </div>
                <div className="bar bar-lime" style={{ height: "78%" }}>
                  <span className="bar-label">Oct</span>
                  <span className="bar-value">312</span>
                </div>
                <div className="bar bar-cyan" style={{ height: "83%" }}>
                  <span className="bar-label">Nov</span>
                  <span className="bar-value">332</span>
                </div>
                <div className="bar bar-rose" style={{ height: "97%" }}>
                  <span className="bar-label">Dec</span>
                  <span className="bar-value">388</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-box">
            <h3>Conversion Rate</h3>
            <div className="pie-chart-container">
              <div className="pie-chart-segments">
                <div
                  className="pie-segment"
                  style={{
                    "--start": "0",
                    "--end": "68",
                    "--color": "#2ed573",
                  }}
                ></div>
                <div
                  className="pie-segment"
                  style={{
                    "--start": "68",
                    "--end": "85",
                    "--color": "#ffd700",
                  }}
                ></div>
                <div
                  className="pie-segment"
                  style={{
                    "--start": "85",
                    "--end": "95",
                    "--color": "#ff7f50",
                  }}
                ></div>
                <div
                  className="pie-segment"
                  style={{
                    "--start": "95",
                    "--end": "100",
                    "--color": "#ff4757",
                  }}
                ></div>
              </div>
              <div className="pie-labels">
                <div className="pie-label success">Success 68%</div>
                <div className="pie-label pending">Pending 17%</div>
                <div className="pie-label review">Review 10%</div>
                <div className="pie-label failed">Failed 5%</div>
              </div>
            </div>
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
                    <Link
                      to="/dashboard/admin/success-stories"
                      className="view"
                    >
                      View
                    </Link>
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
                    <Link
                      to="/dashboard/admin/success-stories"
                      className="view"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <Link to="/dashboard/admin/broadcast" className="quick-btn">
              📢 Broadcast Message
            </Link>
            <Link to="/dashboard/admin/add-event" className="quick-btn">
              📅 Add New Event
            </Link>
            <Link to="/dashboard/admin/announcement" className="quick-btn">
              🌍 Global Announcement
            </Link>
            <Link to="/dashboard/admin/reports" className="quick-btn">
              🚨 Reports Counter (15)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
