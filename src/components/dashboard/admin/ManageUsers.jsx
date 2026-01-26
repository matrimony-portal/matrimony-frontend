import React, { useState, useEffect } from "react";
import { adminService } from "../../../services/adminService.js";
import "../../../styles/admin.css";

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userData = await adminService.getAllUsers();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await adminService.updateUserStatus(userId, newStatus);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && user.status === "active";
    if (activeTab === "blocked")
      return matchesSearch && user.status === "suspended";
    if (activeTab === "premium")
      return matchesSearch && user.subscriptionTier === "premium";

    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h1 className="h3 text-dark mb-2">Manage Users</h1>
        <p className="text-muted mb-0">View and manage all platform users</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="btn-group w-100" role="group">
                <button
                  className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All Users
                </button>
                <button
                  className={`btn ${activeTab === "active" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("active")}
                >
                  Active
                </button>
                <button
                  className={`btn ${activeTab === "blocked" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("blocked")}
                >
                  Blocked
                </button>
                <button
                  className={`btn ${activeTab === "premium" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("premium")}
                >
                  Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Subscription</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="admin-avatar">
                            {user.firstName.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="fw-semibold">
                            {user.firstName} {user.lastName}
                          </div>
                          {user.isVerified && (
                            <span className="badge bg-success">
                              <i className="bi bi-patch-check-fill"></i>{" "}
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{user.email}</div>
                      <small className="text-muted">{user.phone}</small>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === "active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.subscriptionTier === "premium"
                            ? "bg-warning"
                            : "bg-secondary"
                        }`}
                      >
                        {user.subscriptionTier === "premium"
                          ? "Premium"
                          : "Free"}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-warning">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className={`btn ${
                            user.status === "active"
                              ? "btn-outline-danger"
                              : "btn-outline-success"
                          }`}
                          onClick={() =>
                            handleStatusChange(
                              user.id,
                              user.status === "active" ? "suspended" : "active",
                            )
                          }
                        >
                          <i
                            className={`bi ${
                              user.status === "active"
                                ? "bi-ban"
                                : "bi-check-circle"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
