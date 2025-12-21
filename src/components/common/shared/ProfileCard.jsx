import React from "react";
import FreeUserDashboard from "../../dashboard/free/FreeUserDashboard";

const ProfileCard = ({ profile, onSendProposal, onViewProfile }) => {
  return (
    <div className="card profile-card h-100 border-0 shadow-sm">
      <div
        className="profile-image"
        style={{
          backgroundImage: `url(${profile.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          borderRadius: "10px 10px 0 0",
        }}
      />
      <div className="card-body p-3">
        <h5 className="card-title mb-2">{profile.name}</h5>
        <div className="profile-details text-muted small mb-3">
          <div>
            {profile.age} years, {profile.height}
          </div>
          <div>
            {profile.education}, {profile.occupation}
          </div>
          <div>{profile.location}</div>
          <div>
            {profile.religion}, {profile.maritalStatus}
          </div>
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-danger"
            onClick={() => onSendProposal(profile.name)}
          >
            Send Proposal
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => onViewProfile(profile.id)}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
