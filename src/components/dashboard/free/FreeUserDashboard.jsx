import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { interestService } from "../../../services/interestService.js";
import { matchService } from "../../../services/matchService.js";
import "./Dashboard.css";

const FreeUserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("matches");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [matchesData, likedData] = await Promise.all([
        matchService.getMatches(),
        interestService.getLikedUsers(),
      ]);
      setMatches(matchesData || []);
      setLikedUsers(likedData || []);
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId) => {
    try {
      await interestService.likeUser(userId);
      toast.success("Interest sent!");
      loadDashboardData();
    } catch (error) {
      toast.error(error?.message || "Failed to send interest");
    }
  };

  const handlePass = async (userId) => {
    try {
      await interestService.passUser(userId);
      setMatches(matches.filter((m) => m.userId !== userId));
    } catch (error) {
      toast.error(error?.message || "Failed to pass");
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/dashboard/free/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.firstName}!</h1>
          <p className="text-muted">Find your perfect match today</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-value">{matches.length}</span>
            <span className="stat-label">New Matches</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{likedUsers.length}</span>
            <span className="stat-label">Interests Sent</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          <i className="bi bi-heart"></i>
          Matches
        </button>
        <button
          className={`tab-btn ${activeTab === "liked" ? "active" : ""}`}
          onClick={() => setActiveTab("liked")}
        >
          <i className="bi bi-star"></i>
          Liked
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {activeTab === "matches" && (
          <div className="matches-grid">
            {matches.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-search"></i>
                <h3>No matches yet</h3>
                <p>Check back later for new profiles</p>
              </div>
            ) : (
              matches.map((match) => (
                <div key={match.userId} className="match-card">
                  <div className="match-image">
                    <img
                      src={
                        match.profilePhoto ||
                        "/src/assets/images/placeholder/male.jpg"
                      }
                      alt={match.name}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="match-info">
                    <h3>{match.name}</h3>
                    <p className="match-details">
                      {match.age} yrs • {match.city}
                    </p>
                    {match.compatibilityScore && (
                      <p className="match-occupation">
                        {Math.round(match.compatibilityScore * 100)}% Match
                      </p>
                    )}
                  </div>
                  <div className="match-actions">
                    <button
                      className="btn-pass"
                      onClick={() => handlePass(match.userId)}
                      title="Pass"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => handleViewProfile(match.userId)}
                      title="View Profile"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn-like"
                      onClick={() => handleLike(match.userId)}
                      title="Like"
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "liked" && (
          <div className="matches-grid">
            {likedUsers.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-heart"></i>
                <h3>No liked profiles yet</h3>
                <p>Start liking profiles to see them here</p>
              </div>
            ) : (
              likedUsers.map((user) => (
                <div key={user.id} className="match-card">
                  <div className="match-image">
                    <img
                      src={
                        user.profilePhoto || "/assets/images/default-avatar.png"
                      }
                      alt={user.firstName}
                    />
                  </div>
                  <div className="match-info">
                    <h3>
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="match-details">
                      {user.age} yrs • {user.city}
                    </p>
                    <p className="match-occupation">{user.occupation}</p>
                  </div>
                  <div className="match-actions">
                    <button
                      className="btn-view"
                      onClick={() => handleViewProfile(user.id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeUserDashboard;
