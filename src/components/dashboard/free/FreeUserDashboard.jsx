import { useAuth } from "../../../hooks/useAuth.jsx";
import { Link } from "react-router";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";

<<<<<<< HEAD
const FreeUserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  // Mock data - replace with API calls
  const stats = [
    { icon: "👥", number: 28, label: "Total Matches" },
    { icon: "💌", number: 12, label: "Sent Proposals" },
    { icon: "📩", number: 8, label: "Received Proposals" },
    { icon: "⭐", number: 15, label: "Shortlisted" },
    { icon: "💬", number: 6, label: "Active Chats" },
    { icon: "👁️", number: 145, label: "Profile Views" },
  ];

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
    alert(
      `Proposal sent to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
    navigate(`/profile/${profileId}`);
  };

  return (
    <div className="dashboard-container py-3 py-md-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 pb-2 border-bottom">
        <h1 className="h2 mb-2 mb-md-0">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <div className="text-muted small">
          You have 5 new matches and 3 pending proposals
        </div>
      </div>

      {/* Stats Grid - Mobile First */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
            <StatCard {...stat} />
=======
=======
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
const FreeUserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  // Mock data - replace with API calls
  const stats = [
    { icon: "👥", number: 28, label: "Total Matches" },
    { icon: "💌", number: 12, label: "Sent Proposals" },
    { icon: "📩", number: 8, label: "Received Proposals" },
    { icon: "⭐", number: 15, label: "Shortlisted" },
    { icon: "💬", number: 6, label: "Active Chats" },
    { icon: "👁️", number: 145, label: "Profile Views" },
  ];

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
    alert(
      `Proposal sent to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
    navigate(`/profile/${profileId}`);
  };

  return (
    <div className="dashboard-container py-3 py-md-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 pb-2 border-bottom">
        <h1 className="h2 mb-2 mb-md-0">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <div className="text-muted small">
          You have 5 new matches and 3 pending proposals
        </div>
      </div>

      {/* Stats Grid - Mobile First */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
<<<<<<< HEAD
            <div
              className="card h-100 border-0 shadow-sm position-relative"
              style={{ overflow: "hidden" }}
            >
              {/* Lock Overlay for Limited Features */}
              {stat.limit && (
                <div
                  className="position-absolute top-0 end-0 m-2"
                  style={{ zIndex: 1 }}
                >
                  <span
                    className="badge bg-secondary"
                    style={{ fontSize: "0.7rem" }}
                  >
                    LIMITED
                  </span>
                </div>
              )}
              <div className="card-body text-center p-3">
                <div className="mb-2" style={{ fontSize: "2rem" }}>
                  {stat.icon}
                </div>
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "1.5rem", color: "#ae1700" }}
                >
                  {stat.number}
                  <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {stat.limit}
                  </span>
                </div>
                <div className="text-muted small">{stat.label}</div>
              </div>
            </div>
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
=======
            <StatCard {...stat} />
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
          </div>
        ))}
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
      {/* Tabs */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Recommended Matches</h2>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
<<<<<<< HEAD
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
=======
      {/* Limited Matches Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Recommended Matches</h4>
            <span className="badge bg-secondary">Limited Access</span>
          </div>
          <p className="text-muted mb-4">
            Upgrade to premium to see unlimited matches
          </p>

          {/* Blurred Content Effect */}
          <div className="position-relative">
            <div
              style={{
                filter: "blur(5px)",
                pointerEvents: "none",
                userSelect: "none",
              }}
=======
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
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
<<<<<<< HEAD
          <div className="text-center mt-4">
            <Link to="/upgrade" className="btn btn-warning btn-lg fw-bold px-5">
              Upgrade to Premium
            </Link>
          </div>
        </div>
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
=======
        ))}
>>>>>>> dfef089 (feat(adds subscription user components): add subscription user components)
      </div>
    </div>
  );
};

export default FreeUserDashboard;
