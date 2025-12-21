<<<<<<< HEAD
// src/components/dashboard/premium/PremiumUserDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";
=======
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router";
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)

const PremiumUserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  const stats = [
<<<<<<< HEAD
    { icon: "👥", number: 52, label: "Total Matches" },
    { icon: "💌", number: 25, label: "Sent Proposals" },
    { icon: "📩", number: 18, label: "Received Proposals" },
    { icon: "⭐", number: 32, label: "Shortlisted" },
    { icon: "💬", number: 15, label: "Active Chats" },
    { icon: "👁️", number: 485, label: "Profile Views" },
=======
    { icon: "👥", number: 28, label: "Total Matches" },
    { icon: "💌", number: 12, label: "Sent Proposals" },
    { icon: "📩", number: 8, label: "Received Proposals" },
    { icon: "⭐", number: 15, label: "Shortlisted" },
    { icon: "💬", number: 6, label: "Active Chats" },
    { icon: "👁️", number: 145, label: "Profile Views" },
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
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
<<<<<<< HEAD
      isPremium: true,
=======
      online: true,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
<<<<<<< HEAD
      education: "MBBS",
=======
      education: "B.Tech",
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
      occupation: "Doctor",
      location: "Delhi, India",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/sneha.png",
<<<<<<< HEAD
      isPremium: true,
=======
      online: false,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
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
<<<<<<< HEAD
      isPremium: true,
=======
      online: true,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    },
    {
      id: 4,
      name: "Neha Reddy",
      age: 29,
      height: "5'6\"",
      education: "MBA",
      occupation: "Marketing Manager",
      location: "Hyderabad, Telangana",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/neha.png",
<<<<<<< HEAD
      isPremium: true,
=======
      online: false,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    },
    {
      id: 5,
      name: "Divya Patel",
      age: 25,
      height: "5'2\"",
      education: "B.Tech",
      occupation: "Teacher",
      location: "Ahmedabad, Gujarat",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/divya.png",
<<<<<<< HEAD
      isPremium: true,
=======
      online: false,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    },
    {
      id: 6,
      name: "Riya Gupta",
      age: 30,
      height: "5'4\"",
      education: "Masters",
      occupation: "Architect",
      location: "Pune, Maharashtra",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/riya.png",
<<<<<<< HEAD
      isPremium: true,
=======
      online: true,
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    },
  ];

  const handleSendProposal = (profileName) => {
    alert(
      `Proposal sent to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
<<<<<<< HEAD
    navigate(`/dashboard/profile/${profileId}`);
  };

  return (
    <div className="dashboard-container py-3 py-md-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 pb-2 border-bottom">
        <div>
          <h1 className="h2 mb-2 mb-md-0">
            Welcome back, {user?.firstName || "User"}!
            <span className="badge bg-warning text-dark ms-2">⭐ Premium</span>
          </h1>
        </div>
        <div className="text-muted small">
          You have 12 new matches and 8 pending proposals
        </div>
      </div>

      {/* Premium Features Banner */}
      <div className="alert alert-info mb-4">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-star-fill text-warning me-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
          <div>
            <strong>Premium Benefits Active:</strong> Unlimited searches,
            priority visibility, direct messaging, and advanced filters enabled!
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
            <StatCard {...stat} />
=======
    navigate(`/profile/${profileId}`);
  };

  return (
    <div
      className="container-fluid py-3 py-md-4"
      style={{ background: "#f5f7fa" }}
    >
      {/* Header with Premium Badge */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 pb-2 border-bottom">
        <div>
          <h1 className="h3 mb-2">Welcome back, {user?.name || "User"}!</h1>
          <div className="d-flex align-items-center gap-2">
            <span
              className="badge px-3 py-2"
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                color: "#1f2937",
                fontWeight: "700",
              }}
            >
              ⭐ Premium Member
            </span>
            <span className="text-muted small">
              Valid until {user?.subscriptionExpiry || "2025-12-31"}
            </span>
          </div>
        </div>
        <div className="text-muted small mt-2 mt-md-0">
          You have 5 new matches and 3 pending proposals
        </div>
      </div>

      {/* Stats Grid - Mobile First */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2">
            <div className="card h-100 border-0 shadow-sm stat-card">
              <div className="card-body text-center p-3">
                <div className="stat-icon mb-2" style={{ fontSize: "2rem" }}>
                  {stat.icon}
                </div>
                <div
                  className="stat-number fw-bold mb-1"
                  style={{ fontSize: "1.5rem", color: "#ae1700" }}
                >
                  {stat.number}
                </div>
                <div className="stat-label text-muted small">{stat.label}</div>
              </div>
            </div>
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-4">
<<<<<<< HEAD
        <h2 className="h4 mb-3">Premium Matches</h2>
        <ul className="nav nav-tabs">
=======
        <h2 className="h4 mb-3">Recommended Matches</h2>
        <ul className="nav nav-tabs border-bottom">
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
<<<<<<< HEAD
=======
              style={{
                border: "none",
                borderBottom:
                  activeTab === "new" ? "3px solid #ae1700" : "none",
                color: activeTab === "new" ? "#ae1700" : "#666",
                fontWeight: activeTab === "new" ? "600" : "normal",
              }}
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
            >
              New Matches
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "premium" ? "active" : ""}`}
              onClick={() => setActiveTab("premium")}
<<<<<<< HEAD
=======
              style={{
                border: "none",
                borderBottom:
                  activeTab === "premium" ? "3px solid #ae1700" : "none",
                color: activeTab === "premium" ? "#ae1700" : "#666",
                fontWeight: activeTab === "premium" ? "600" : "normal",
              }}
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
            >
              Premium Profiles
            </button>
          </li>
<<<<<<< HEAD
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "compatible" ? "active" : ""}`}
              onClick={() => setActiveTab("compatible")}
            >
              Most Compatible
            </button>
          </li>
=======
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
          <li className="nav-item d-none d-md-block">
            <button
              className={`nav-link ${activeTab === "recent" ? "active" : ""}`}
              onClick={() => setActiveTab("recent")}
<<<<<<< HEAD
=======
              style={{
                border: "none",
                borderBottom:
                  activeTab === "recent" ? "3px solid #ae1700" : "none",
                color: activeTab === "recent" ? "#ae1700" : "#666",
                fontWeight: activeTab === "recent" ? "600" : "normal",
              }}
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
            >
              Recently Viewed
            </button>
          </li>
        </ul>
      </div>

<<<<<<< HEAD
      {/* Profile Cards Grid */}
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
=======
      {/* Profile Cards Grid - Responsive */}
      <div className="row g-3 g-md-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="col-12 col-md-6 col-lg-4">
            <div className="card profile-card h-100 border-0 shadow-sm">
              {/* Profile Image */}
              <div className="position-relative">
                <div
                  className="profile-image"
                  style={{
                    backgroundImage: `url(${profile.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  {profile.online && (
                    <span
                      className="position-absolute top-0 end-0 m-2 badge bg-success"
                      style={{ fontSize: "0.75rem" }}
                    >
                      🟢 Online
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="card-body p-3">
                <h5 className="card-title mb-2">{profile.name}</h5>
                <div className="profile-details text-muted small mb-3">
                  <div className="mb-1">
                    {profile.age} years, {profile.height}
                  </div>
                  <div className="mb-1">
                    {profile.education}, {profile.occupation}
                  </div>
                  <div className="mb-1">{profile.location}</div>
                  <div>
                    {profile.religion}, {profile.maritalStatus}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleSendProposal(profile.name)}
                    style={{
                      background:
                        "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
                      border: "none",
                    }}
                  >
                    Send Proposal
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleViewProfile(profile.id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Benefits Banner */}
      <div className="card border-0 shadow-sm mt-4">
        <div
          className="card-body p-4"
          style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          }}
        >
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="mb-3">🎉 You're enjoying Premium benefits!</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">✅ Unlimited matches and messages</li>
                <li className="mb-2">✅ Advanced search filters</li>
                <li className="mb-2">✅ Priority customer support</li>
                <li className="mb-2">✅ Ad-free experience</li>
              </ul>
            </div>
            <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
              <button className="btn btn-dark btn-lg">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style>{`
        .stat-card {
          transition: transform 0.3s;
          cursor: pointer;
        }
        .stat-card:hover {
          transform: translateY(-5px);
        }
        .profile-card {
          transition: all 0.3s;
        }
        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.15) !important;
        }
        .nav-tabs {
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .nav-tabs::-webkit-scrollbar {
          height: 4px;
        }
        .nav-tabs::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 2px;
        }
      `}</style>
>>>>>>> a66b085 (chore: reorganize project structure and subscription components)
    </div>
  );
};

export default PremiumUserDashboard;
