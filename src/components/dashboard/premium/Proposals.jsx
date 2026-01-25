// src/components/dashboard/premium/Proposals.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import ProposalCard from "../../common/shared/ProposalCard.jsx";

const Proposals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("received");

  const receivedProposals = [
    {
      id: 1,
      name: "Priya Agarwal",
      age: 28,
      height: "5'4\"",
      education: "MBA",
      occupation: "Software Engineer",
      location: "Mumbai, Maharashtra",
      description: "Looking for educated partner with good family values...",
      image: "../../assets/images/female-profile/priyanka.png",
      isNew: true,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      education: "MBBS",
      occupation: "Doctor",
      location: "Delhi, India",
      description: "Seeking understanding and caring life partner...",
      image: "../../assets/images/female-profile/sneha.png",
      isNew: false,
      timeAgo: "1 day ago",
    },
    {
      id: 3,
      name: "Ananya Mehta",
      age: 27,
      height: "5'5\"",
      education: "Masters",
      occupation: "Business Analyst",
      location: "Bangalore, Karnataka",
      description: "Looking for ambitious and family-oriented partner...",
      image: "../../assets/images/female-profile/ananya.png",
      isNew: false,
      timeAgo: "3 days ago",
    },
  ];

  const sentProposals = [
    {
      id: 4,
      name: "Neha Reddy",
      age: 29,
      height: "5'6\"",
      education: "MBA",
      occupation: "Marketing Manager",
      location: "Hyderabad, Telangana",
      status: "pending",
      sentDate: "2 days ago",
      image: "../../assets/images/female-profile/neha.png",
    },
    {
      id: 5,
      name: "Divya Patel",
      age: 25,
      height: "5'2\"",
      education: "B.Tech",
      occupation: "Teacher",
      location: "Ahmedabad, Gujarat",
      status: "viewed",
      sentDate: "5 days ago",
      image: "../../assets/images/female-profile/divya.png",
    },
  ];

  const acceptedProposals = [
    {
      id: 6,
      name: "Riya Gupta",
      age: 30,
      height: "5'4\"",
      education: "Masters",
      occupation: "Architect",
      location: "Pune, Maharashtra",
      acceptedDate: "1 week ago",
      image: "../../assets/images/female-profile/riya.png",
    },
  ];

  const handleAccept = (proposal) => {
    if (window.confirm(`Accept interest from ${proposal.name}?`)) {
      alert(`Interest accepted! You can now chat with ${proposal.name}.`);
    }
  };

  const handleDecline = (proposal) => {
    if (window.confirm(`Decline interest from ${proposal.name}?`)) {
      alert("Interest declined politely.");
    }
  };

  const handleViewProfile = (proposalId) => {
    navigate(`/dashboard/profile/${proposalId}`);
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
            Declined (5)
          </button>
        </li>
      </ul>

      {/* Received Tab */}
      {activeTab === "received" && (
        <div>
          {receivedProposals.length > 0 ? (
            receivedProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onAccept={handleAccept}
                onDecline={handleDecline}
                onViewProfile={handleViewProfile}
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
                  onClick={() => navigate("/dashboard/search")}
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
          {acceptedProposals.length > 0 ? (
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
                        Accepted {proposal.acceptedDate}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => navigate("/dashboard/messages")}
                        >
                          <i className="bi bi-chat-dots me-1"></i>
                          Chat
                        </button>
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
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-x-circle fs-1 text-muted mb-3 d-block"></i>
            <h5>Declined Interests</h5>
            <p className="text-muted">You have declined 5 interests</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals;
