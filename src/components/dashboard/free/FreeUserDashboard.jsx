import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";
import { freeUserService } from "../../../services/jsonDataService.js";

const FreeUserDashboard = () => {
  const { user } = useAuth();
  const { proposalDailyLimit, profileViewLimit } = useUserCapabilities();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [proposalsSent, setProposalsSent] = useState(0);
  const [profilesViewed, setProfilesViewed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [modalContext, setModalContext] = useState("upgrade");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load profiles from JSON service
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        // Get current user's gender to filter opposite gender profiles
        const currentUserGender = user?.gender || "male";
        const oppositeGender = currentUserGender === "male" ? "female" : "male";

        const allProfiles = await freeUserService.getProfiles({
          gender: oppositeGender,
        });

        // Get user's blocked users
        const blockedUsers = await freeUserService.getBlockedUsers(user?.id);
        const blockedProfileIds = blockedUsers.map((b) => b.blockedUserId);

        // Filter out blocked profiles
        const filteredProfiles = allProfiles.filter(
          (p) => !blockedProfileIds.includes(p.userId),
        );

        setProfiles(filteredProfiles);

        // Load today's activity
        const today = new Date();
        const todayViews = await freeUserService.getProfileViews(
          user?.id,
          today,
        );
        setProfilesViewed(todayViews.length);

        const todayProposals = await freeUserService.getProposals(user?.id);
        const todayProposalsCount = todayProposals.filter((p) => {
          const proposalDate = new Date(p.sentAt);
          return proposalDate.toDateString() === today.toDateString();
        }).length;
        setProposalsSent(todayProposalsCount);
      } catch (error) {
        console.error("Error loading profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadProfiles();
    }
  }, [user]);

  const handleSendProposal = async (profileName) => {
    if (proposalsSent >= proposalDailyLimit) {
      setModalContext("proposals");
      setShowUpgradeModal(true);
      return;
    }

    // Find profile by name to get ID
    const profile = profiles.find((p) => p.name === profileName);
    if (!profile) {
      alert("Profile not found.");
      return;
    }

    try {
      await freeUserService.sendProposal(user?.id, profile.id);
      await freeUserService.trackActivity(user?.id, "proposal_sent", {
        profileId: profile.id,
        profileName,
      });

      setProposalsSent((count) => count + 1);
      alert(
        `Proposal sent to ${profileName}! You will be notified when they respond.`,
      );
    } catch (error) {
      console.error("Error sending proposal:", error);
      alert("Failed to send proposal. Please try again.");
    }
  };

  const handleViewProfile = async (profileId) => {
    if (profilesViewed >= profileViewLimit) {
      setModalContext("views");
      setShowUpgradeModal(true);
      return;
    }

    try {
      await freeUserService.trackProfileView(user?.id, profileId);
      await freeUserService.trackActivity(user?.id, "profile_viewed", {
        profileId,
      });

      setProfilesViewed((count) => count + 1);
      navigate(`/dashboard/free/profile/${profileId}`);
    } catch (error) {
      console.error("Error tracking profile view:", error);
      // Still navigate even if tracking fails
      navigate(`/dashboard/free/profile/${profileId}`);
    }
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
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            No profiles found. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="row g-3 g-md-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="col-12 col-md-6 col-lg-4">
              <ProfileCard
                profile={{
                  ...profile,
                  image:
                    profile.photos?.[0] || "/assets/images/default-profile.png",
                }}
                onSendProposal={handleSendProposal}
                onViewProfile={() => handleViewProfile(profile.id)}
              />
            </div>
          ))}
        </div>
      )}

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
