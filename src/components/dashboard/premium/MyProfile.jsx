// src/components/dashboard/premium/MyProfile.jsx
import React, { useState } from "react";
//import { useAuth } from "../../../hooks/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  //const { user } = useAuth();
  const navigate = useNavigate();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    "../../assets/images/male/rahul-p1.png",
    "../../assets/images/male/rahul-p2.png",
    "../../assets/images/male/rahul-p3.png",
    "../../assets/images/male/rahul-p4.png",
    "../../assets/images/male/rahul-p5.png",
  ];

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
    photo: "../../assets/images/male/rahul.png",
  };

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

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Profile Header Card */}
      <div className="card mb-3 mb-md-4">
        <div className="card-body">
          <div className="row g-3">
            {/* Profile Photo - Stacks on mobile */}
            <div className="col-12 col-md-3 text-center">
              <img
                src={profileData.photo}
                alt={profileData.name}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "250px", width: "100%" }}
              />
              <span className="badge bg-success d-inline-block">
                <i className="bi bi-patch-check-fill me-1"></i>
                Verified Profile
              </span>
            </div>

            {/* Profile Info */}
            <div className="col-12 col-md-9">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="h3 mb-2">
                    {profileData.name}
                    <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                  </h1>
                  <p className="text-muted mb-3">ID: {profileData.id}</p>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm mt-2 mt-sm-0"
                  onClick={() => navigate("/dashboard/edit-profile")}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit Profile
                </button>
              </div>

              {/* Quick Info Grid - Responsive */}
              <div className="row g-2 g-md-3 mb-3">
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Age</span>
                  <strong>{profileData.age} years</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Height</span>
                  <strong>{profileData.height}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Religion</span>
                  <strong>
                    {profileData.religion}, {profileData.caste}
                  </strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Location</span>
                  <strong>{profileData.location}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Education</span>
                  <strong>{profileData.education}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Occupation</span>
                  <strong>{profileData.occupation}</strong>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-warning text-dark">
                  ⭐ Premium Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 g-md-4">
        {/* Main Content */}
        <div className="col-12 col-lg-8">
          {/* About Me */}
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="h5 border-bottom pb-2 mb-3">About Me</h3>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                I'm a 31-year-old Product Manager based in Pune, working with a
                leading tech firm. I did my B.Tech from IIT Delhi and MBA from
                ISB Hyderabad. I enjoy reading about startups, exploring new
                cuisines, and keeping fit through running and yoga. Family and
                work-life balance matter a lot to me. I believe in progressive
                thinking, honesty, and mutual respect in relationships. I'm
                looking for a partner who is kind, confident, and shares similar
                values. Someone who values emotional connection and enjoys both
                quiet evenings and spontaneous adventures.
              </p>
            </div>
          </div>

          {/* Basic Details */}
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="h5 border-bottom pb-2 mb-3">Basic Details</h3>
              <div className="row g-3">
                {[
                  { label: "Age", value: "31 years" },
                  { label: "Height", value: "5'10\" (178 cm)" },
                  { label: "Marital Status", value: "Never Married" },
                  { label: "Mother Tongue", value: "Hindi" },
                  { label: "Body Type", value: "Fit" },
                  { label: "Complexion", value: "Wheatish" },
                ].map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4">
                    <div className="p-2 p-md-3 bg-light rounded">
                      <div className="small text-muted mb-1">{item.label}</div>
                      <div className="fw-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Career */}
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="h5 border-bottom pb-2 mb-3">Education & Career</h3>
              <div className="row g-3">
                {[
                  { label: "Highest Education", value: "MBA" },
                  { label: "College/University", value: "ISB Hyderabad" },
                  { label: "Occupation", value: "Product Manager" },
                  { label: "Organization", value: "TechSphere Pvt. Ltd." },
                  { label: "Annual Income", value: "₹25-30 Lakhs" },
                  { label: "Working City", value: "Pune" },
                ].map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4">
                    <div className="p-2 p-md-3 bg-light rounded">
                      <div className="small text-muted mb-1">{item.label}</div>
                      <div className="fw-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="h5 border-bottom pb-2 mb-3">Family Details</h3>
              <div className="row g-3">
                {[
                  { label: "Family Type", value: "Joint Family" },
                  { label: "Family Status", value: "Upper Middle Class" },
                  { label: "Father's Occupation", value: "Businessman" },
                  { label: "Mother's Occupation", value: "Homemaker" },
                  { label: "Brothers", value: "1 (Married)" },
                  { label: "Sisters", value: "None" },
                ].map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4">
                    <div className="p-2 p-md-3 bg-light rounded">
                      <div className="small text-muted mb-1">{item.label}</div>
                      <div className="fw-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="h5 border-bottom pb-2 mb-3">Photo Gallery</h3>
              <div className="row g-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="col-4 col-md-3">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="img-fluid rounded cursor-pointer"
                      style={{
                        cursor: "pointer",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      onClick={() => openLightbox(idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-12 col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h4 className="h6 mb-3">Contact Information</h4>

              <div className="d-flex align-items-center p-2 bg-light rounded mb-2">
                <i className="bi bi-telephone-fill me-3 fs-5"></i>
                <div className="flex-grow-1">
                  <div className="small text-muted">Phone</div>
                  <div className="fw-semibold">+91 98765-98765</div>
                </div>
              </div>

              <div className="d-flex align-items-center p-2 bg-light rounded mb-2">
                <i className="bi bi-envelope-fill me-3 fs-5"></i>
                <div className="flex-grow-1">
                  <div className="small text-muted">Email</div>
                  <div className="fw-semibold small">
                    rahul.agarwal@email.com
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center p-2 bg-light rounded mb-3">
                <i className="bi bi-whatsapp me-3 fs-5 text-success"></i>
                <div className="flex-grow-1">
                  <div className="small text-muted">WhatsApp</div>
                  <div className="fw-semibold">Available</div>
                </div>
              </div>

              <div className="alert alert-warning mb-0 small">
                <i className="bi bi-lock-fill me-1"></i>
                Contact details visible to premium members only
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          onClick={() => setShowLightbox(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowLightbox(false)}
                ></button>
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
                  <i className="bi bi-chevron-left"></i> Previous
                </button>
                <button className="btn btn-light" onClick={nextImage}>
                  Next <i className="bi bi-chevron-right"></i>
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
