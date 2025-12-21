import React from "react";

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="card stat-card h-100 border-0 shadow-sm">
      <div className="card-body text-center p-3">
        <div className="stat-icon mb-2" style={{ fontSize: "2rem" }}>
          {icon}
        </div>
        <div
          className="stat-number text-danger fw-bold mb-1"
          style={{ fontSize: "1.5rem" }}
        >
          {number}
        </div>
        <div className="stat-label text-muted small">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
