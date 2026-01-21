// src/components/dashboard/premium/PremiumUserDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import StatCard from "../../common/shared/StatCard.jsx";
import ProfileCard from "../../common/shared/ProfileCard.jsx";

const PremiumUserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  const stats = [
    { icon: "👥", number: 52, label: "Total Matches" },
    { icon: "💌", number: 25, label: "Sent Proposals" },
    { icon: "📩", number: 18, label: "Received Proposals" },
    { icon: "⭐", number: 32, label: "Shortlisted" },
    { icon: "💬", number: 15, label: "Active Chats" },
    { icon: "👁️", number: 485, label: "Profile Views" },
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
      isPremium: true,
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      education: "MBBS",
      occupation: "Doctor",
      location: "Delhi, India",
      religion: "Hindu",
      maritalStatus: "Never Married",
      image: "/assets/images/female-profile/sneha.png",
      isPremium: true,
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
      isPremium: true,
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
      isPremium: true,
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
      isPremium: true,
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
      isPremium: true,
    },
  ];

  const handleSendProposal = (profileName) => {
    alert(
      `Proposal sent to ${profileName}! You will be notified when they respond.`,
    );
  };

  const handleViewProfile = (profileId) => {
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
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <h2 className="h4 mb-3">Premium Matches</h2>
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
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "compatible" ? "active" : ""}`}
              onClick={() => setActiveTab("compatible")}
            >
              Most Compatible
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
    </div>
  );
};

export default PremiumUserDashboard;
