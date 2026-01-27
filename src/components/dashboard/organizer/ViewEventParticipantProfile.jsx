import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Card, Button, Spinner, Modal } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { eventService } from "../../../services/eventService.js";

const DEFAULT_PHOTO = "/assets/images/event-organizer/profile-pic.jpg";

// Placeholder gallery when backend does not return photoUrls
const GALLERY_PLACEHOLDERS = [
  "/assets/images/event-organizer/profile-pic.jpg",
  "/assets/images/event-organizer/coffee.jpg",
  "/assets/images/event-organizer/speed-dating.jpg",
];

/**
 * Reusable section: only render if at least one item has a value.
 * Same structure as free/premium ProfileView ProfileSection.
 */
function ProfileSection({ title, items }) {
  const filtered = (items || []).filter(
    (i) => i.value != null && String(i.value).trim() !== "",
  );
  if (filtered.length === 0) return null;
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h5 className="border-bottom border-danger border-2 pb-2 mb-3">
          {title}
        </h5>
        <div className="row g-3">
          {filtered.map((item, idx) => (
            <div key={idx} className="col-6 col-md-4">
              <div className="p-2 bg-light rounded">
                <div className="small text-muted mb-1">{item.label}</div>
                <div className="fw-semibold">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

/**
 * Read-only view of a participant's (registrant's) profile.
 * Layout matches free/premium user ProfileView: header (photo, summary), About,
 * Photo Gallery, Basic Details, Religious Background, Education & Career,
 * sidebar Contact. No Send Interest / Chat / Shortlist / Similar Profiles.
 */
export const ViewEventParticipantProfile = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Backend ParticipantProfileResponse has no photoUrls; use placeholders for gallery
  const galleryImages = GALLERY_PLACEHOLDERS;

  const openLightbox = useCallback((index) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  useEffect(() => {
    const load = async () => {
      if (!registrationId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await eventService.getParticipantProfile(registrationId);
        setProfile(data);
      } catch (e) {
        console.error("Error loading participant profile:", e);
        setError(
          e.response?.data?.message || e.message || "Failed to load profile",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [registrationId]);

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner animation="border" variant="danger" />
        <span className="ms-2">Loading profile…</span>
      </Container>
    );
  }

  if (error || !profile) {
    return (
      <Container fluid>
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          className="mb-3 p-0 text-decoration-none d-flex align-items-center gap-2"
          style={{ color: "#ae1700" }}
        >
          <ArrowLeft size={20} />
          Back
        </Button>
        <Card className="shadow-sm">
          <Card.Body>
            <p className="text-danger mb-0">{error || "Profile not found."}</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const name = profile.userName || "Participant";
  const location = [profile.city, profile.state, profile.country]
    .filter(Boolean)
    .join(", ");
  const religionCaste = [profile.religion, profile.caste]
    .filter(Boolean)
    .join(", ");

  // Header summary: same 6-tile layout as free/premium (Age, Height, Religion, Location, Education, Occupation)
  // We have: Age, Gender, Religion/Caste, Location, Education, Occupation (no Height in API)
  const basicDetails = [
    {
      label: "Age",
      value: profile.age != null ? `${profile.age} years` : null,
    },
    { label: "Gender", value: profile.gender || null },
  ];

  const religiousBackground = [
    { label: "Religion", value: profile.religion || null },
    { label: "Caste", value: profile.caste || null },
  ];

  const educationCareer = [
    { label: "Education", value: profile.education || null },
    { label: "Occupation", value: profile.occupation || null },
    { label: "Location", value: location || null },
  ];

  return (
    <div className="container-fluid py-3 py-md-4">
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="text-decoration-none d-flex align-items-center gap-2 mb-3 p-0"
        style={{ color: "#ae1700" }}
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </Button>

      {/* Profile Header – same structure as free/premium ProfileView */}
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <div className="row g-3">
            {/* Profile Photo – col-3 like free/premium */}
            <div className="col-12 col-md-3 text-center">
              <img
                src={DEFAULT_PHOTO}
                alt={name}
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "250px" }}
              />
              <span className="badge bg-success mb-2 d-block">
                <i className="bi bi-check-circle-fill me-1" />
                Verified Profile
              </span>
              <p className="text-muted small mb-0">
                <i className="bi bi-person-badge me-1" />
                Event Participant · View only
              </p>
            </div>

            {/* Profile Info – col-6; no Actions column (no Send Interest / Chat) */}
            <div className="col-12 col-md-9">
              <h2 className="h4 mb-2">
                {name}
                <i className="bi bi-patch-check-fill text-primary ms-2" />
              </h2>
              <p className="text-muted mb-3">ID: User #{profile.userId}</p>

              {/* 6-tile summary like free/premium: Age, Gender, Religion, Location, Education, Occupation */}
              <div className="row g-2 mb-3">
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Age</span>
                  <strong>
                    {profile.age != null ? `${profile.age} years` : "—"}
                  </strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Gender</span>
                  <strong>{profile.gender || "—"}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Religion</span>
                  <strong>{religionCaste || "—"}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Location</span>
                  <strong>{location || "—"}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Education</span>
                  <strong>{profile.education || "—"}</strong>
                </div>
                <div className="col-6 col-md-4">
                  <span className="text-muted small d-block">Occupation</span>
                  <strong>{profile.occupation || "—"}</strong>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="row g-3">
        {/* Main Content – col-lg-8 like free/premium */}
        <div className="col-12 col-lg-8">
          {/* About Me */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="border-bottom border-danger border-2 pb-2 mb-3">
                About Me
              </h5>
              <p
                className="text-muted mb-0"
                style={{ textAlign: "justify", whiteSpace: "pre-line" }}
              >
                {profile.aboutMe || "No description added."}
              </p>
            </Card.Body>
          </Card>

          {/* Photo Gallery – same idea as free/premium; placeholders when no API photos */}
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h5 className="border-bottom border-danger border-2 pb-2 mb-3">
                Photo Gallery
              </h5>
              <div className="row g-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="col-4 col-md-3">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => openLightbox(idx)}
                    />
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <ProfileSection title="Basic Details" items={basicDetails} />
          <ProfileSection
            title="Religious Background"
            items={religiousBackground}
          />
          <ProfileSection title="Education & Career" items={educationCareer} />
        </div>

        {/* Sidebar – col-lg-4: Contact like free/premium; no Similar Profiles */}
        <div className="col-12 col-lg-4">
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Contact Information</h6>
              {profile.userEmail && (
                <div className="d-flex align-items-center p-2 bg-light rounded mb-2">
                  <i
                    className="bi bi-envelope-fill me-3 fs-5"
                    style={{ color: "#ae1700" }}
                  />
                  <div>
                    <div className="small text-muted">Email</div>
                    <div className="fw-semibold small">{profile.userEmail}</div>
                  </div>
                </div>
              )}
              <div className="alert alert-light border mb-0 mt-3 small">
                <i className="bi bi-info-circle me-1" />
                View-only. You cannot edit this profile.
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Lightbox Modal – same pattern as free/premium ProfileView */}
      <Modal
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
        centered
        size="xl"
      >
        <Modal.Body className="bg-dark text-center p-0 position-relative">
          <Button
            variant="light"
            size="sm"
            className="position-absolute top-0 end-0 m-2"
            onClick={() => setShowLightbox(false)}
            aria-label="Close"
          >
            <i className="bi bi-x-lg" />
          </Button>
          <img
            src={galleryImages[currentImageIndex]}
            alt="Gallery"
            className="img-fluid"
            style={{ maxHeight: "85vh" }}
          />
          <div className="d-flex justify-content-between p-3">
            <Button variant="light" onClick={prevImage}>
              ‹ Previous
            </Button>
            <Button variant="light" onClick={nextImage}>
              Next ›
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
