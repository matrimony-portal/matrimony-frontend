// src/components/dashboard/premium/MyProfile.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import profileImg from "../../../assets/images/male/rahul.png";
import g1 from "../../../assets/images/male/rahul-p1.png";
import g2 from "../../../assets/images/male/rahul-p2.png";
import g3 from "../../../assets/images/male/rahul-p3.png";
import g4 from "../../../assets/images/male/rahul-p4.png";
import g5 from "../../../assets/images/male/rahul-p5.png";
import StatCard from "../../common/shared/StatCard";
import ProfileCompleteBanner from "../shared/ProfileCompleteBanner.jsx";
import { profileService } from "../../../services/profileService.js";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import {
  computeProfileCompletionPercentage,
  heightCmToDisplay,
  ageFromDob,
} from "../../../utils/profileUtils.js";

const galleryImages = [g1, g2, g3, g4, g5];

const MyProfile = () => {
  const navigate = useNavigate();
  const basePath = useDashboardBasePath();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (e) {
      console.error("MyProfile getProfile error:", e);
      setError(
        e?.response?.data?.error?.message ||
          e?.response?.data?.message ||
          "Could not load profile.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const percent = profile ? computeProfileCompletionPercentage(profile) : 0;
  const stats = [
    { icon: "👥", number: "—", label: "Total Matches" },
    { icon: "💌", number: "—", label: "Sent Proposals" },
    { icon: "📩", number: "—", label: "Received Proposals" },
    { icon: "⭐", number: "—", label: "Shortlisted" },
    { icon: "💬", number: "—", label: "Active Chats" },
    { icon: "👁️", number: "—", label: "Profile Views" },
  ];

  const openLightbox = (i) => {
    setCurrentImageIndex(i);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const name =
    profile?.firstName || profile?.lastName
      ? [profile.firstName, profile.lastName].filter(Boolean).join(" ")
      : "—";
  const age = ageFromDob(profile?.dateOfBirth);
  const location =
    [profile?.city, profile?.state, profile?.country]
      .filter(Boolean)
      .join(", ") || "—";

  if (loading) {
    return (
      <div className="container-fluid py-3 py-md-4">
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-3 py-md-4">
        <div className="alert alert-warning">
          {error}{" "}
          <button
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={loadProfile}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 py-md-4">
      <ProfileCompleteBanner percent={percent} />

      {/* PROFILE HEADER */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-3 text-center">
              <img
                src={profileImg}
                alt={name}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "250px" }}
              />
              <span
                className={
                  profile?.isVerified
                    ? "badge bg-success"
                    : "badge bg-secondary"
                }
              >
                <i
                  className={
                    profile?.isVerified
                      ? "bi bi-patch-check-fill me-1"
                      : "bi bi-hourglass-split me-1"
                  }
                />
                {profile?.isVerified
                  ? "Verified Profile"
                  : "Profile not verified"}
              </span>
              {percent < 100 && (
                <div className="mt-2">
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-info"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <small className="text-muted">{percent}% complete</small>
                </div>
              )}
            </div>

            <div className="col-12 col-md-9">
              <div className="d-flex justify-content-between flex-wrap mb-3">
                <div>
                  <h1 className="h3 mb-1">
                    {name}
                    {profile?.isVerified && (
                      <i className="bi bi-patch-check-fill text-primary ms-2" />
                    )}
                  </h1>
                  <p className="text-muted">ID: #{profile?.id ?? "—"}</p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`${basePath}/edit-profile`)}
                >
                  <i className="bi bi-pencil me-1" />
                  Edit Profile
                </button>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6 col-md-4">
                  <small className="text-muted">Age</small>
                  <div className="fw-semibold">
                    {age != null ? `${age} years` : "—"}
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Height</small>
                  <div className="fw-semibold">
                    {heightCmToDisplay(profile?.heightCm)}
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Religion</small>
                  <div className="fw-semibold">
                    {[profile?.religion, profile?.caste]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Location</small>
                  <div className="fw-semibold">{location}</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Education</small>
                  <div className="fw-semibold">{profile?.education || "—"}</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Occupation</small>
                  <div className="fw-semibold">
                    {profile?.occupation || "—"}
                  </div>
                </div>
              </div>

              <span className="badge bg-warning text-dark">
                ⭐ Premium Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-2">
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">About Me</h5>
              <p className="text-muted text-justify">
                {profile?.aboutMe ||
                  "Add something about yourself in Edit Profile to help others know you better."}
              </p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">Photo Gallery</h5>
              <div className="row g-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="col-4 col-md-3">
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="img-fluid rounded cursor-pointer"
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => openLightbox(i)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>
              <div className="alert alert-warning small mb-0">
                <i className="bi bi-lock-fill me-1" />
                Contact details visible to premium members only
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {showLightbox && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setShowLightbox(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowLightbox(false)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body text-center">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt="Gallery"
                  className="img-fluid rounded"
                  style={{ maxHeight: "80vh" }}
                />
              </div>
              <div className="modal-footer border-0 justify-content-between">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={prevImage}
                >
                  ‹ Previous
                </button>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={nextImage}
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
