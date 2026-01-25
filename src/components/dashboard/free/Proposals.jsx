// src/components/dashboard/free/Proposals.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth.jsx";
import ProposalCard from "../../common/shared/ProposalCard.jsx";
import {
  freeUserService,
  jsonDataService,
} from "../../../services/jsonDataService.js";

const Proposals = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("received");
  const [loading, setLoading] = useState(true);
  const [receivedProposals, setReceivedProposals] = useState([]);
  const [sentProposals, setSentProposals] = useState([]);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [declinedProposals, setDeclinedProposals] = useState([]);

  const formatTimeAgo = useCallback((dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  }, []);

  const isNewProposal = useCallback((sentAt) => {
    if (!sentAt) return false;
    const sentDate = new Date(sentAt);
    const now = new Date();
    const diffHours = (now - sentDate) / (1000 * 60 * 60);
    return diffHours < 24; // New if received within 24 hours
  }, []);

  const loadProposals = useCallback(async () => {
    try {
      setLoading(true);
      const allProposals = await freeUserService.getProposals(user?.id);
      const profiles = await jsonDataService.getAll("profiles");

      // Get current user's profile to identify received proposals
      const currentUserProfile = profiles.find((p) => p.userId === user?.id);
      const currentUserProfileId = currentUserProfile?.id;

      // Separate proposals by type
      const received = [];
      const sent = [];
      const accepted = [];
      const declined = [];

      for (const proposal of allProposals) {
        let profile = null;
        let isReceived = false;

        // Determine if this is a received or sent proposal
        if (proposal.toProfileId === currentUserProfileId) {
          // Received proposal - get sender's profile
          const senderProfile = profiles.find(
            (p) => p.userId === proposal.fromUserId,
          );
          if (senderProfile) {
            profile = senderProfile;
            isReceived = true;
          }
        } else if (proposal.fromUserId === user?.id) {
          // Sent proposal - get receiver's profile
          profile = profiles.find((p) => p.id === proposal.toProfileId);
        }

        if (!profile) continue;

        const enrichedProposal = {
          ...proposal,
          profileId: profile.id,
          name: profile.name,
          age: profile.age,
          height: profile.height,
          education: profile.education,
          occupation: profile.occupation,
          location: profile.location || `${profile.city}, ${profile.state}`,
          description: profile.bio || "Looking for a compatible match...",
          image: profile.photos?.[0] || "/assets/images/default-profile.png",
          timeAgo: formatTimeAgo(proposal.sentAt),
          sentDate: formatTimeAgo(proposal.sentAt),
          acceptedDate:
            proposal.status === "accepted"
              ? formatTimeAgo(proposal.updatedAt)
              : null,
          isNew: isReceived && isNewProposal(proposal.sentAt),
        };

        if (isReceived) {
          if (proposal.status === "accepted") {
            accepted.push(enrichedProposal);
          } else if (proposal.status === "declined") {
            declined.push(enrichedProposal);
          } else {
            received.push(enrichedProposal);
          }
        } else {
          if (proposal.status === "accepted") {
            accepted.push(enrichedProposal);
          } else if (proposal.status === "declined") {
            declined.push(enrichedProposal);
          } else {
            sent.push(enrichedProposal);
          }
        }
      }

      setReceivedProposals(received);
      setSentProposals(sent);
      setAcceptedProposals(accepted);
      setDeclinedProposals(declined);
    } catch (error) {
      console.error("Error loading proposals:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, formatTimeAgo, isNewProposal]);

  // Load proposals on mount
  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  // Reload when tab changes
  useEffect(() => {
    if (user?.id) {
      loadProposals();
    }
  }, [activeTab, user?.id, loadProposals]);

  const handleAccept = async (proposal) => {
    if (window.confirm(`Accept interest from ${proposal.name}?`)) {
      try {
        await freeUserService.updateProposalStatus(proposal.id, "accepted");
        await freeUserService.trackActivity(user?.id, "proposal_accepted", {
          proposalId: proposal.id,
          profileName: proposal.name,
        });
        alert(`Interest accepted! You can now chat with ${proposal.name}.`);
        loadProposals(); // Reload to update the list
      } catch (error) {
        console.error("Error accepting proposal:", error);
        alert("Failed to accept proposal. Please try again.");
      }
    }
  };

  const handleDecline = async (proposal) => {
    if (window.confirm(`Decline interest from ${proposal.name}?`)) {
      try {
        await freeUserService.updateProposalStatus(proposal.id, "declined");
        await freeUserService.trackActivity(user?.id, "proposal_declined", {
          proposalId: proposal.id,
          profileName: proposal.name,
        });
        alert("Interest declined politely.");
        loadProposals(); // Reload to update the list
      } catch (error) {
        console.error("Error declining proposal:", error);
        alert("Failed to decline proposal. Please try again.");
      }
    }
  };

  const handleViewProfile = (profileId) => {
    navigate(`/dashboard/free/profile/${profileId}`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Pending", class: "bg-warning" },
      viewed: { text: "Viewed", class: "bg-info" },
      accepted: { text: "Accepted", class: "bg-success" },
      declined: { text: "Declined", class: "bg-danger" },
    };
    const badge = badges[status] || badges.pending;
    return <span className={`badge ${badge.class}`}>{badge.text}</span>;
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-2">Proposals & Interests</h1>
        <p className="text-muted">
          Manage all your sent and received interests
        </p>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "received" ? "active" : ""}`}
            onClick={() => setActiveTab("received")}
          >
            Received ({receivedProposals.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "sent" ? "active" : ""}`}
            onClick={() => setActiveTab("sent")}
          >
            Sent ({sentProposals.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "accepted" ? "active" : ""}`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted ({acceptedProposals.length})
          </button>
        </li>
        <li className="nav-item d-none d-md-block">
          <button
            className={`nav-link ${activeTab === "declined" ? "active" : ""}`}
            onClick={() => setActiveTab("declined")}
          >
            Declined ({declinedProposals.length})
          </button>
        </li>
      </ul>

      {/* Received Tab */}
      {activeTab === "received" && (
        <div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : receivedProposals.length > 0 ? (
            receivedProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onAccept={() => handleAccept(proposal)}
                onDecline={() => handleDecline(proposal)}
                onViewProfile={() => handleViewProfile(proposal.profileId)}
              />
            ))
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                <h5>No Received Interests</h5>
                <p className="text-muted">
                  You haven't received any interests yet
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sent Tab */}
      {activeTab === "sent" && (
        <div>
          {sentProposals.length > 0 ? (
            sentProposals.map((proposal) => (
              <div key={proposal.id} className="card mb-3">
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <div
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundImage: `url(${proposal.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    <div className="col">
                      <h5 className="mb-1">{proposal.name}</h5>
                      <div className="text-muted small mb-2">
                        <div>
                          {proposal.age} yrs, {proposal.height}
                        </div>
                        <div>
                          {proposal.education}, {proposal.occupation}
                        </div>
                        <div>{proposal.location}</div>
                      </div>
                      <div className="d-flex gap-2 align-items-center flex-wrap">
                        {getStatusBadge(proposal.status)}
                        <span className="text-muted small">
                          Sent {proposal.sentDate}
                        </span>
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleViewProfile(proposal.id)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-send fs-1 text-muted mb-3 d-block"></i>
                <h5>No Sent Interests</h5>
                <p className="text-muted">You haven't sent any interests yet</p>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => navigate("/dashboard/free/search")}
                >
                  Search Matches
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Accepted Tab */}
      {activeTab === "accepted" && (
        <div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : acceptedProposals.length > 0 ? (
            acceptedProposals.map((proposal) => (
              <div key={proposal.id} className="card mb-3">
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <div
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundImage: `url(${proposal.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    <div className="col">
                      <h5 className="mb-1">{proposal.name}</h5>
                      <div className="text-muted small mb-2">
                        <div>
                          {proposal.age} yrs, {proposal.height}
                        </div>
                        <div>
                          {proposal.education}, {proposal.occupation}
                        </div>
                        <div>{proposal.location}</div>
                      </div>
                      <span className="badge bg-success">
                        Accepted {proposal.acceptedDate || "recently"}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => navigate("/dashboard/free/messages")}
                        >
                          <i className="bi bi-chat-dots me-1"></i>
                          Chat
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleViewProfile(proposal.profileId)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-check-circle fs-1 text-muted mb-3 d-block"></i>
                <h5>No Accepted Interests</h5>
                <p className="text-muted">
                  You don't have any accepted interests yet
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Declined Tab */}
      {activeTab === "declined" && (
        <div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : declinedProposals.length > 0 ? (
            declinedProposals.map((proposal) => (
              <div key={proposal.id} className="card mb-3">
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <div
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          backgroundImage: `url(${proposal.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                    <div className="col">
                      <h5 className="mb-1">{proposal.name}</h5>
                      <div className="text-muted small mb-2">
                        <div>
                          {proposal.age} yrs, {proposal.height}
                        </div>
                        <div>
                          {proposal.education}, {proposal.occupation}
                        </div>
                        <div>{proposal.location}</div>
                      </div>
                      <span className="badge bg-danger">
                        Declined {proposal.sentDate}
                      </span>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleViewProfile(proposal.profileId)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-x-circle fs-1 text-muted mb-3 d-block"></i>
                <h5>No Declined Interests</h5>
                <p className="text-muted">
                  You haven't declined any interests yet
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Proposals;
