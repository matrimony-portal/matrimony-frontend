// src/components/dashboard/premium/ManageProfile.jsx
//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../../../hooks/useAuth.jsx";

const ManageProfile = () => {
  //const { user } = useAuth();
  const navigate = useNavigate();
  //const [activeSection, setActiveSection] = useState("overview");

  // Profile completion sections
  const completionSections = [
    {
      id: "basic",
      name: "Basic Information",
      completed: true,
      percentage: 100,
      icon: "bi-person-fill",
    },
    {
      id: "photos",
      name: "Photos",
      completed: false,
      percentage: 60,
      icon: "bi-image-fill",
      action: () => navigate("/dashboard/manage-photos"),
    },
    {
      id: "education",
      name: "Education & Career",
      completed: true,
      percentage: 100,
      icon: "bi-mortarboard-fill",
    },
    {
      id: "family",
      name: "Family Details",
      completed: false,
      percentage: 70,
      icon: "bi-people-fill",
      action: () => navigate("/dashboard/edit-profile"),
    },
    {
      id: "about",
      name: "About Me",
      completed: false,
      percentage: 50,
      icon: "bi-chat-left-text-fill",
      action: () => navigate("/dashboard/edit-profile"),
    },
    {
      id: "preferences",
      name: "Partner Preferences",
      completed: false,
      percentage: 0,
      icon: "bi-heart-fill",
      action: () => navigate("/dashboard/edit-profile"),
    },
  ];

  const overallCompletion = Math.round(
    completionSections.reduce((acc, section) => acc + section.percentage, 0) /
      completionSections.length,
  );

  const profileStats = [
    {
      label: "Profile Views",
      value: 485,
      icon: "bi-eye-fill",
      color: "primary",
    },
    {
      label: "Interests Received",
      value: 28,
      icon: "bi-heart-fill",
      color: "danger",
    },
    {
      label: "Profile Likes",
      value: 156,
      icon: "bi-hand-thumbs-up-fill",
      color: "success",
    },
    {
      label: "Shortlisted By",
      value: 42,
      icon: "bi-star-fill",
      color: "warning",
    },
  ];

  const quickActions = [
    {
      title: "Edit Profile",
      description: "Update your basic information",
      icon: "bi-pencil-square",
      action: () => navigate("/dashboard/edit-profile"),
      color: "primary",
    },
    {
      title: "Manage Photos",
      description: "Add or update profile photos",
      icon: "bi-images",
      action: () => navigate("/dashboard/manage-photos"),
      color: "info",
    },
    {
      title: "Privacy Settings",
      description: "Control who can see your profile",
      icon: "bi-shield-lock",
      action: () => navigate("/dashboard/settings"),
      color: "warning",
    },
    {
      title: "Partner Preferences",
      description: "Set your ideal match criteria",
      icon: "bi-filter-circle",
      action: () => navigate("/dashboard/edit-profile"),
      color: "success",
    },
  ];

  const visibilitySettings = {
    showPhone: true,
    showEmail: true,
    showLastSeen: true,
    profileVisibility: "everyone",
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="h3 mb-2">Manage Profile</h1>
          <p className="text-muted mb-0">
            Complete your profile to get better matches
          </p>
        </div>
        <button
          className="btn btn-danger mt-2 mt-md-0"
          onClick={() => navigate("/dashboard/my-profile")}
        >
          <i className="bi bi-eye me-2"></i>
          View Public Profile
        </button>
      </div>

      {/* Overall Profile Completion */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center mb-2">
                <h5 className="mb-0 me-3">Profile Completion</h5>
                <span className="badge bg-primary">{overallCompletion}%</span>
              </div>
              <div className="progress" style={{ height: "12px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${overallCompletion}%` }}
                  role="progressbar"
                ></div>
              </div>
              <p className="small text-muted mt-2 mb-0">
                {overallCompletion < 100
                  ? `Complete ${100 - overallCompletion}% more to increase your visibility by 3x!`
                  : "🎉 Your profile is 100% complete!"}
              </p>
            </div>
            <div className="col-12 col-md-4 text-center text-md-end">
              <div className="display-4 mb-2">{overallCompletion}%</div>
              <span className="badge bg-warning text-dark">
                <i className="bi bi-star-fill me-1"></i>
                Premium Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="row g-3 mb-4">
        {profileStats.map((stat, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <i
                  className={`bi ${stat.icon} text-${stat.color} mb-2`}
                  style={{ fontSize: "2rem" }}
                ></i>
                <div className="display-6 fw-bold text-dark">{stat.value}</div>
                <div className="small text-muted">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Sections */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-4">Complete Your Profile</h5>
          <div className="row g-3">
            {completionSections.map((section) => (
              <div key={section.id} className="col-12 col-md-6">
                <div
                  className={`p-3 border rounded ${section.completed ? "bg-light" : "border-danger"}`}
                  style={{ cursor: section.action ? "pointer" : "default" }}
                  onClick={section.action}
                >
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <i className={`bi ${section.icon} me-2 fs-5`}></i>
                      <strong>{section.name}</strong>
                    </div>
                    {section.completed ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : (
                      <i className="bi bi-exclamation-circle-fill text-danger"></i>
                    )}
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${section.completed ? "bg-success" : "bg-warning"}`}
                      style={{ width: `${section.percentage}%` }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <small className="text-muted">
                      {section.percentage}% Complete
                    </small>
                    {!section.completed && section.action && (
                      <small className="text-danger">Click to complete</small>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-4">Quick Actions</h5>
          <div className="row g-3">
            {quickActions.map((action, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={action.action}
                >
                  <div className="card-body text-center">
                    <div
                      className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3 bg-${action.color} bg-opacity-10`}
                      style={{ width: "60px", height: "60px" }}
                    >
                      <i
                        className={`bi ${action.icon} fs-3 text-${action.color}`}
                      ></i>
                    </div>
                    <h6 className="mb-2">{action.title}</h6>
                    <p className="small text-muted mb-0">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy & Visibility */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-4">Privacy & Visibility</h5>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <strong className="d-block">Profile Visibility</strong>
                  <small className="text-muted">Who can see your profile</small>
                </div>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                >
                  <option value="everyone">Everyone</option>
                  <option value="premium">Premium Only</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <strong className="d-block">Show Contact Details</strong>
                  <small className="text-muted">Display phone & email</small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={visibilitySettings.showPhone}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <strong className="d-block">Show Last Seen</strong>
                  <small className="text-muted">
                    Let others see when you were active
                  </small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={visibilitySettings.showLastSeen}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <div>
                  <strong className="d-block">Allow Photo Download</strong>
                  <small className="text-muted">
                    Let others download your photos
                  </small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tips */}
      <div className="card border-info">
        <div className="card-body">
          <div className="d-flex align-items-start">
            <i className="bi bi-lightbulb-fill text-info fs-3 me-3"></i>
            <div>
              <h5 className="text-info mb-2">Tips to Improve Your Profile</h5>
              <ul className="mb-0 ps-3">
                <li className="mb-1">Add at least 5 clear, recent photos</li>
                <li className="mb-1">
                  Write a detailed "About Me" section (100+ words)
                </li>
                <li className="mb-1">
                  Complete all family details for better matches
                </li>
                <li className="mb-1">
                  Set specific partner preferences to get relevant matches
                </li>
                <li className="mb-1">
                  Verify your profile for 10x more visibility
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
