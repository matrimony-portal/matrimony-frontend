import { useAuth } from "../../../hooks/useAuth.jsx";
import { Link } from "react-router";

<<<<<<< HEAD
// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";

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
const FreeUserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: "👥", number: 5, label: "Total Matches", limit: "/10" },
    { icon: "💌", number: 3, label: "Sent Proposals", limit: "/5" },
    { icon: "📩", number: 2, label: "Received Proposals", limit: "" },
    { icon: "⭐", number: 8, label: "Shortlisted", limit: "/10" },
    { icon: "💬", number: 2, label: "Active Chats", limit: "/3" },
    { icon: "👁️", number: 45, label: "Profile Views", limit: "/100" },
  ];

  return (
    <div className="container-fluid py-4" style={{ background: "#f5f7fa" }}>
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h3 mb-2">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted mb-0">
            You're on the <strong>Free Plan</strong>
          </p>
        </div>
        <Link
          to="/upgrade"
          className="btn btn-warning fw-bold mt-3 mt-md-0"
          style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
            border: "none",
          }}
        >
          ⭐ Upgrade to Premium
        </Link>
      </div>

      {/* Upgrade Banner */}
      <div
        className="alert alert-warning mb-4"
        style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          border: "2px solid #fbbf24",
        }}
      >
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <h5 className="alert-heading mb-2">🚀 Unlock Premium Features!</h5>
            <p className="mb-0 small">
              Get unlimited matches, advanced filters, priority support, and
              more. Upgrade now and find your perfect match faster!
            </p>
          </div>
          <Link
            to="/upgrade"
            className="btn btn-dark btn-sm ms-3 d-none d-md-block"
          >
            View Plans
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
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
          </div>
        ))}
      </div>

<<<<<<< HEAD
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
            >
              <div className="row g-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="col-12 col-md-6 col-lg-4">
                    <div className="card">
                      <div
                        style={{
                          height: "200px",
                          background: "#e2e8f0",
                        }}
                      />
                      <div className="card-body">
                        <h5>Profile {i}</h5>
                        <p className="text-muted">Details hidden</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Overlay */}
            <div
              className="position-absolute top-50 start-50 translate-middle text-center"
              style={{ zIndex: 10 }}
            >
              <div
                className="bg-white p-4 rounded-3 shadow-lg"
                style={{ maxWidth: "400px" }}
              >
                <div className="mb-3" style={{ fontSize: "3rem" }}>
                  🔒
                </div>
                <h4 className="mb-3">Unlock More Matches</h4>
                <p className="text-muted mb-4">
                  Upgrade to premium to view unlimited profiles and connect with
                  more potential matches
                </p>
                <Link
                  to="/upgrade"
                  className="btn btn-warning fw-bold w-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    border: "none",
                  }}
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h4 className="mb-4">What You're Missing</h4>
          <div className="row g-3">
            {[
              {
                icon: "🔍",
                title: "Advanced Search",
                desc: "Find exactly what you're looking for",
              },
              {
                icon: "💬",
                title: "Unlimited Messages",
                desc: "Chat without restrictions",
              },
              {
                icon: "📞",
                title: "Contact Details",
                desc: "View phone numbers & emails",
              },
              {
                icon: "🎯",
                title: "Priority Support",
                desc: "Get help when you need it",
              },
              {
                icon: "🎟️",
                title: "Event Priority",
                desc: "Register first for exclusive events",
              },
              {
                icon: "🚫",
                title: "Ad-Free Experience",
                desc: "Browse without distractions",
              },
            ].map((feature, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="d-flex align-items-start">
                  <div className="me-3" style={{ fontSize: "2rem" }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h6 className="mb-1">{feature.title}</h6>
                    <p className="text-muted small mb-0">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/upgrade" className="btn btn-warning btn-lg fw-bold px-5">
              Upgrade to Premium
            </Link>
          </div>
        </div>
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
      </div>
    </div>
  );
};

export default FreeUserDashboard;
