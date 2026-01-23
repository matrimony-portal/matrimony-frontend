// src/components/dashboard/premium/MyProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";

// Images (CORRECT way in React)
import profileImg from "../../../assets/images/male/rahul.png";
import g1 from "../../../assets/images/male/rahul-p1.png";
import g2 from "../../../assets/images/male/rahul-p2.png";
import g3 from "../../../assets/images/male/rahul-p3.png";
import g4 from "../../../assets/images/male/rahul-p4.png";
import g5 from "../../../assets/images/male/rahul-p5.png";

// Components
import StatCard from "../../common/shared/StatCard";

const MyProfile = () => {
  const navigate = useNavigate();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* ---------------- MOCK DATA (replace with API later) ---------------- */

  const stats = [
    { icon: "👥", number: 26, label: "Total Matches" },
    { icon: "💌", number: 12, label: "Sent Proposals" },
    { icon: "📩", number: 8, label: "Received Proposals" },
    { icon: "⭐", number: 15, label: "Shortlisted" },
    { icon: "💬", number: 6, label: "Active Chats" },
    { icon: "👁️", number: 145, label: "Profile Views" },
  ];

  const galleryImages = [g1, g2, g3, g4, g5];

  const profileData = {
    name: "Rahul Agarwal",
    id: "PM768942",
    age: 31,
    height: "5'10\"",
    religion: "Hindu",
    caste: "Baniya",
    location: "Pune, Maharashtra",
    education: "B.Tech, MBA",
    occupation: "Product Manager",
    photo: profileImg,
  };

  /* ---------------- HANDLERS ---------------- */

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
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

  /* ---------------- RENDER ---------------- */

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* ================= PROFILE HEADER ================= */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-3 text-center">
              <img
                src={profileData.photo}
                alt={profileData.name}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "250px" }}
              />
              <span className="badge bg-success">
                <i className="bi bi-patch-check-fill me-1"></i>
                Verified Profile
              </span>
            </div>

            <div className="col-12 col-md-9">
              <div className="d-flex justify-content-between flex-wrap mb-3">
                <div>
                  <h1 className="h3 mb-1">
                    {profileData.name}
                    <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                  </h1>
                  <p className="text-muted">ID: {profileData.id}</p>
                </div>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/dashboard/edit-profile")}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit Profile
                </button>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-6 col-md-4">
                  <small className="text-muted">Age</small>
                  <div className="fw-semibold">{profileData.age} years</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Height</small>
                  <div className="fw-semibold">{profileData.height}</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Religion</small>
                  <div className="fw-semibold">
                    {profileData.religion}, {profileData.caste}
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Location</small>
                  <div className="fw-semibold">{profileData.location}</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Education</small>
                  <div className="fw-semibold">{profileData.education}</div>
                </div>
                <div className="col-6 col-md-4">
                  <small className="text-muted">Occupation</small>
                  <div className="fw-semibold">{profileData.occupation}</div>
                </div>
              </div>

              <span className="badge bg-warning text-dark">
                ⭐ Premium Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="row g-2 g-md-3 mb-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-6 col-md-4 col-lg-2">
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {/* About Me */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">About Me</h5>
              <p className="text-muted text-justify">
                I'm a 31-year-old Product Manager based in Pune, working with a
                leading tech firm. I value honesty, emotional connection, and
                work-life balance. Looking for a partner who shares similar
                values and enjoys both quiet moments and spontaneous adventures.
              </p>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">Photo Gallery</h5>
              <div className="row g-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="col-4 col-md-3">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="img-fluid rounded cursor-pointer"
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      onClick={() => openLightbox(idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>

              <div className="alert alert-warning small mb-0">
                <i className="bi bi-lock-fill me-1"></i>
                Contact details visible to premium members only
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
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
                <button className="btn btn-light" onClick={prevImage}>
                  ‹ Previous
                </button>
                <button className="btn btn-light" onClick={nextImage}>
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
