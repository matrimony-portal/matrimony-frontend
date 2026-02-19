import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { profileService } from "../../../services/profileService.js";

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const loadProfile = useCallback(async () => {
    try {
      const { data } = await profileService.getProfileById(id);
      setProfile(data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-danger" />
      </div>
    );
  }

  if (!profile) {
    return <div className="alert alert-warning m-3">Profile not found</div>;
  }

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age;
  };

  const galleryImages = profile.photos || [];

  const sendProposal = () => {
    toast.success(`Interest sent to ${profile.firstName}!`);
  };

  const startChat = () => {
    navigate("/dashboard/messages");
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
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-12 col-md-3 text-center">
              <img
                src={
                  galleryImages[currentImageIndex] ||
                  "/src/assets/images/placeholder/user.png"
                }
                alt={profile.firstName}
                className="img-fluid rounded mb-3"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  height: "auto",
                  cursor: galleryImages.length > 0 ? "pointer" : "default",
                }}
                onError={(e) =>
                  (e.target.src = "/src/assets/images/placeholder/user.png")
                }
                onClick={() =>
                  galleryImages.length > 0 && setShowLightbox(true)
                }
              />
              {galleryImages.length > 1 && (
                <div className="d-flex gap-2 justify-content-center flex-wrap">
                  {galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`rounded ${idx === currentImageIndex ? "border border-danger border-3" : ""}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentImageIndex(idx)}
                      onError={(e) =>
                        (e.target.src =
                          "/src/assets/images/placeholder/user.png")
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <h2 className="h4 mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted mb-3">ID: {profile.id}</p>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <span className="text-muted small d-block">Age</span>
                  <strong>{calculateAge(profile.dateOfBirth)} years</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Height</span>
                  <strong>{profile.heightCm || "N/A"} cm</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Religion</span>
                  <strong>
                    {profile.religion || "N/A"}, {profile.caste || "N/A"}
                  </strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Location</span>
                  <strong>
                    {profile.city || "N/A"}, {profile.state || "N/A"}
                  </strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Education</span>
                  <strong>{profile.education || "N/A"}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted small d-block">Occupation</span>
                  <strong>{profile.occupation || "N/A"}</strong>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="d-grid gap-2">
                <button className="btn btn-danger" onClick={sendProposal}>
                  💌 Send Interest
                </button>
                <button className="btn btn-outline-danger" onClick={startChat}>
                  💬 Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          {profile.aboutMe && (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="border-bottom pb-2 mb-3">About Me</h5>
                <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                  {profile.aboutMe}
                </p>
              </div>
            </div>
          )}

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">Basic Details</h5>
              <div className="row g-3">
                {[
                  {
                    label: "Age",
                    value: `${calculateAge(profile.dateOfBirth)} years`,
                  },
                  { label: "Height", value: `${profile.heightCm || "N/A"} cm` },
                  { label: "Weight", value: `${profile.weightKg || "N/A"} kg` },
                  { label: "Marital Status", value: profile.maritalStatus },
                  { label: "Religion", value: profile.religion || "N/A" },
                  { label: "Caste", value: profile.caste || "N/A" },
                ].map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4">
                    <div className="p-2 bg-light rounded">
                      <div className="small text-muted mb-1">{item.label}</div>
                      <div className="fw-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="border-bottom pb-2 mb-3">Education & Career</h5>
              <div className="row g-3">
                {[
                  { label: "Education", value: profile.education || "N/A" },
                  { label: "Occupation", value: profile.occupation || "N/A" },
                  {
                    label: "Income",
                    value: profile.income ? `₹${profile.income}` : "N/A",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="col-6 col-md-4">
                    <div className="p-2 bg-light rounded">
                      <div className="small text-muted mb-1">{item.label}</div>
                      <div className="fw-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {profile.preferences && (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="border-bottom pb-2 mb-3">Partner Preferences</h5>
                <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                  {profile.preferences}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Contact Information</h6>
              <div className="p-2 bg-light rounded mb-2">
                <div className="small text-muted">Phone</div>
                <div className="fw-semibold">{profile.phone || "N/A"}</div>
              </div>
              <div className="p-2 bg-light rounded mb-2">
                <div className="small text-muted">Email</div>
                <div className="fw-semibold">{profile.email || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLightbox && galleryImages.length > 0 && (
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
              <button
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                style={{ zIndex: 1 }}
                onClick={() => setShowLightbox(false)}
              />
              <img
                src={galleryImages[currentImageIndex]}
                alt="Gallery"
                className="img-fluid rounded"
              />
              {galleryImages.length > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-light" onClick={prevImage}>
                    ← Previous
                  </button>
                  <span className="text-white">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </span>
                  <button className="btn btn-light" onClick={nextImage}>
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
