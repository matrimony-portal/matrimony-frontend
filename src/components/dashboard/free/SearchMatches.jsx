import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { interestService } from "../../../services/interestService.js";
import { matchService } from "../../../services/matchService.js";
import "./Dashboard.css";

const FreeSearchMatches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const data = await matchService.getPotentialMatches();
      setMatches(data || []);
    } catch {
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (userId) => {
    try {
      await interestService.likeUser(userId);
      toast.success("Interest sent!");
    } catch {
      toast.error("Failed to send interest");
    }
  };

  const handlePass = async (userId) => {
    try {
      await interestService.passUser(userId);
      setMatches(matches.filter((m) => m.userId !== userId));
    } catch {
      toast.error("Failed to pass");
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
        <h1>Search Matches</h1>
        <p className="text-muted">Discover compatible profiles</p>
      </div>

      <div className="matches-grid">
        {matches.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-search"></i>
            <h3>No matches found</h3>
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
                  onError={(e) => {
                    e.target.src = "/src/assets/images/placeholder/male.jpg";
                  }}
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
                >
                  <i className="bi bi-x-lg"></i>
                </button>
                <button
                  className="btn-view"
                  onClick={() =>
                    navigate(`/dashboard/free/profile/${match.userId}`)
                  }
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="btn-like"
                  onClick={() => handleLike(match.userId)}
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreeSearchMatches;
