// src/components/common/shared/ProposalCard.jsx
import React from "react";

const ProposalCard = ({ proposal, onAccept, onDecline, onViewProfile }) => {
  return (
    <div className="card proposal-card shadow-sm mb-3">
      <div className="row g-0 align-items-center p-3">
        {/* Profile Photo */}
        <div className="col-auto">
          <div
            className="proposal-photo rounded"
            style={{
              width: "100px",
              height: "100px",
              backgroundImage: `url(${proposal.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="col">
          <div className="ps-3">
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
            <p className="text-muted small mb-2">{proposal.description}</p>
            <div className="d-flex gap-2 align-items-center">
              {proposal.isNew && <span className="badge bg-success">New</span>}
              <span className="text-muted small">
                Received {proposal.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="col-auto">
          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={() => onAccept(proposal)}
            >
              ✓ Accept
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => onViewProfile(proposal.id)}
            >
              View Profile
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDecline(proposal)}
            >
              ✗ Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
