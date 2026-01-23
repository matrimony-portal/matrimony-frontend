import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";

const FreeUserDashboard = () => {
  const { user } = useAuth();
  const { proposalDailyLimit, profileViewLimit } = useUserCapabilities();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [proposalsSent, setProposalsSent] = useState(0);
  const [profilesViewed, setProfilesViewed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [modalContext, setModalContext] = useState("upgrade");

  const profiles = [
    {
      id: 1,
      name: "Priya Agarwal",
      age: 28,
      height: "5'4\"",
      education: "MBA",
      occupation: "Software Engineer",
      location: "Mumbai, Maharashtra",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/priyanka.png",
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      education: "B.Tech",
      occupation: "Doctor",
      location: "Delhi, India",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/sneha.png",
    },
    {
      id: 3,
      name: "Ananya Mehta",
      age: 27,
      height: "5'5\"",
      education: "Masters",
      occupation: "Business Analyst",
      location: "Bangalore, Karnataka",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/ananya.png",
    },
  ];

  const handleSendProposal = (profileName) => {
    if (proposalsSent >= proposalDailyLimit) {
      setModalContext("proposals");
      setShowUpgradeModal(true);
      return;
    }
    setProposalsSent((count) => count + 1);
    alert(
      `Proposal sent to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
    if (profilesViewed >= profileViewLimit) {
      setModalContext("views");
      setShowUpgradeModal(true);
      return;
    }
    setProfilesViewed((count) => count + 1);
    navigate(`/dashboard/free/profile/${profileId}`);
  };

  return (
    <div className="dashboard-container py-3 py-md-4">
      {/* Upgrade Banner */}
      <div className="alert alert-warning d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
        <div>
          <strong>Upgrade to Premium</strong> for unlimited searches, direct
          messaging, and priority visibility in matches.
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => navigate("/dashboard/free/subscription")}
          >
            See Premium Plans
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              setModalContext("upgrade");
              setShowUpgradeModal(true);
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 pb-2 border-bottom p-2">
        <h1 className="h2 mb-2 mb-md-0">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <div className="text-muted small">
          You have 5 new matches and 3 pending proposals
        </div>
      </div>

      {/* Capability badges */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <span className="badge bg-light text-dark">
          Proposals left today:{" "}
          {Math.max(proposalDailyLimit - proposalsSent, 0)} /{" "}
          {proposalDailyLimit === Infinity ? "∞" : proposalDailyLimit}
        </span>
        <span className="badge bg-light text-dark">
          Profile views remaining:{" "}
          {Math.max(profileViewLimit - profilesViewed, 0)} /{" "}
          {profileViewLimit === Infinity ? "∞" : profileViewLimit}
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Recommended Matches</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              New Matches
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "premium" ? "active" : ""}`}
              onClick={() => setActiveTab("premium")}
            >
              Premium Profiles
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <button
              className={`nav-link ${activeTab === "recent" ? "active" : ""}`}
              onClick={() => setActiveTab("recent")}
            >
              Recently Viewed
            </button>
          </li>
        </ul>
      </div>

      {/* Profile Cards Grid - Responsive */}
      <div className="row g-3 g-md-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="col-12 col-md-6 col-lg-4">
            <ProfileCard
              profile={profile}
              onSendProposal={handleSendProposal}
              onViewProfile={handleViewProfile}
            />
          </div>
        ))}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Go Premium</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowUpgradeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {modalContext === "proposals" && (
                  <p className="mb-0">
                    You’ve reached today’s proposal limit for free members.
                    Upgrade to send unlimited proposals and connect faster.
                  </p>
                )}
                {modalContext === "views" && (
                  <p className="mb-0">
                    You’ve hit the profile view limit for today. Premium unlocks
                    unlimited views and advanced filters.
                  </p>
                )}
                {modalContext === "upgrade" && (
                  <p className="mb-0">
                    Premium members get unlimited searches, direct messaging,
                    and early access to events. Ready to upgrade?
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Maybe Later
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard/free/subscription")}
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeUserDashboard;
