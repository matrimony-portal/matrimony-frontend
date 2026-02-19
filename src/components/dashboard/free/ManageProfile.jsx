import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { profileService } from "../../../services/profileService.js";
import "./Dashboard.css";

const FreeManageProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="modern-dashboard">
      <div className="page-header">
        <h1>My Profile</h1>
        <p className="text-muted">View and manage your profile information</p>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <img
              src={profile?.profilePhoto || "/assets/images/default-avatar.png"}
              alt={user?.firstName}
            />
          </div>
          <div className="profile-details">
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="profile-meta">
              {profile?.age} years • {profile?.city}
            </p>
            <p className="profile-bio">{profile?.bio || "No bio added yet"}</p>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <i className="bi bi-briefcase"></i>
            <div>
              <span className="info-label">Occupation</span>
              <span className="info-value">
                {profile?.occupation || "Not specified"}
              </span>
            </div>
          </div>
          <div className="info-card">
            <i className="bi bi-mortarboard"></i>
            <div>
              <span className="info-label">Education</span>
              <span className="info-value">
                {profile?.education || "Not specified"}
              </span>
            </div>
          </div>
          <div className="info-card">
            <i className="bi bi-geo-alt"></i>
            <div>
              <span className="info-label">Location</span>
              <span className="info-value">
                {profile?.city}, {profile?.state}
              </span>
            </div>
          </div>
          <div className="info-card">
            <i className="bi bi-heart"></i>
            <div>
              <span className="info-label">Marital Status</span>
              <span className="info-value">
                {profile?.maritalStatus || "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeManageProfile;
