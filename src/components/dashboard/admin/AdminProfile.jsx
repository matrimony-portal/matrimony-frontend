import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAdminById } from "../../../services/admin/AdminProfile";
import "./AdminProfile.css";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    Joining_date: "",
    Last_login: "",
    avatar: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const adminId = localStorage.getItem("adminId") || "1";
        const data = await getAdminById(adminId);
        // Map backend field names to frontend field names
        const mappedData = {
          id: data.id,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          role: data.role || "ADMIN",
          status: data.status,
          created_at: data.createdAt,
          updated_at: data.updatedAt,
          avatar: data.avatar,
        };
        setAdminData(mappedData);
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
        // Mock data for development
        setAdminData({
          id: "ADM001",
          first_name: "John",
          last_name: "Smith",
          email: "john.smith@bandan.com",
          phone: "+91 9876543210",
          role: "ADMIN",
          status: "ACTIVE",
          created_at: "2023-01-15T10:30:00Z",
          updated_at: "2024-01-20T15:45:00Z",
        });
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="admin-profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </button>
        <center>
          <h2>Admin Profile</h2>
        </center>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {adminData.avatar ? (
              <img src={adminData.avatar} alt="Admin Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {adminData.first_name?.[0]}
                {adminData.last_name?.[0]}
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="info-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Admin ID</label>
                  <span>{adminData.id}</span>
                </div>
                <div className="info-item">
                  <label>First Name</label>
                  <span>{adminData.first_name || "N/A"}</span>
                </div>
                <div className="info-item">
                  <label>Last Name</label>
                  <span>{adminData.last_name || "N/A"}</span>
                </div>
                <div className="info-item">
                  <label>Email Address</label>
                  <span>{adminData.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone Number</label>
                  <span>{adminData.phone}</span>
                </div>
                <div className="info-item">
                  <label>Role</label>
                  <span className="role-badge">{adminData.role}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Account Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Status</label>
                  <span className={`status-${adminData.status?.toLowerCase()}`}>
                    {adminData.status}
                  </span>
                </div>
                <div className="info-item">
                  <label>Created At</label>
                  <span>
                    {new Date(adminData.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <label>Updated At</label>
                  <span>
                    {new Date(adminData.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <label>Last Modified</label>
                  <span>{new Date(adminData.updated_at).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
