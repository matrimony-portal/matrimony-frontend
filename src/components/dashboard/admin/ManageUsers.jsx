import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import "../../../styles/admin.css";

const ManageUsers = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
  });
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
    fetchStats();
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        timeout: 10000,
      });
      console.log("Fetched users:", data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      if (error.code === "ECONNABORTED") {
        console.error("Request timeout - backend may not be running");
      }
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get("/api/user-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Fetched stats:", data);
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
  };

  const handleStatusChange = async (userEmail, newStatus, userName) => {
    const action = newStatus === "BLOCKED" ? "block" : "unblock";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${userName}?`,
    );
    if (!confirmed) return;

    try {
      console.log("Updating user status:", { userEmail, newStatus });

      if (newStatus === "BLOCKED") {
        await axios.put(
          `/api/users/${encodeURIComponent(userEmail)}/status`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        await axios.put(
          `/api/users/${encodeURIComponent(userEmail)}/unblock`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      }

      await fetchUsers();
      await fetchStats();
    } catch (error) {
      console.error(
        "Error updating user status:",
        error.response?.data || error.message,
      );
      alert("Failed to update user status. Please try again.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const userName = user.userName || "";
    const email = user.email || "";

    const matchesSearch =
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && user.status === "ACTIVE";
    if (activeTab === "blocked")
      return matchesSearch && user.status === "BLOCKED";
    if (activeTab === "premium")
      return matchesSearch && user.subscription === "PAID";

    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
        <Link to="/dashboard/admin" className="btn btn-outline-secondary mb-2">
          ← Back to Dashboard
        </Link>
        <h1 className="h3 text-dark mb-2">Manage Users</h1>
        <p className="text-muted mb-0">View and manage all platform users</p>
      </div>

      {/* Stats Boxes */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-primary">{stats.totalUsers}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-success">{stats.activeUsers}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="text-danger">{stats.blockedUsers}</h3>
              <p className="text-muted mb-0">Blocked Users</p>
            </div>
          </div>
        </div>
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
                  className={`btn ${activeTab === "BLOCKED" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("blocked")}
                >
                  Blocked
                </button>
                <button
                  className={`btn ${activeTab === "paid" ? "btn-primary" : "btn-outline-primary"}`}
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
                  <th>User Name</th>
                  <th>Email </th>
                  <th>Contact No.</th>
                  <th>Status</th>
                  <th>Subscription</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="admin-avatar">
                            {user.userName?.charAt(0).toUpperCase() || "U"}
                          </div>
                        </div>
                        <div>
                          <div className="fw-semibold">{user.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.contactNo || "N/A"}</td>
                    <td>{user.status}</td>
                    <td>{user.subscription}</td>
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-warning">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className={`btn ${user.status === "BLOCKED" ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() =>
                            handleStatusChange(
                              user.email,
                              user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED",
                              user.userName,
                            )
                          }
                        >
                          <i className="bi bi-ban"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="text-muted">
                Showing {indexOfFirstUser + 1} to{" "}
                {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>
                <button className="btn btn-outline-primary" disabled>
                  Page {currentPage} of {totalPages}
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
