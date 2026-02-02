import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Image,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router";
import { organizerService } from "../../../services/organizerService.js";
import { eventService } from "../../../services/eventService.js";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";

// ============ View Organizer Profile ============
export const OrganizerProfile = () => {
  const { user } = useAuth();
  const base = useDashboardBasePath();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([
    { icon: "📅", number: "0", label: "Total Events", variant: "primary" },
    { icon: "✔", number: "0", label: "Active Events", variant: "success" },
    { icon: "👥", number: "0", label: "Total Registrations", variant: "info" },
    { icon: "⏳", number: "0", label: "Pending Payments", variant: "warning" },
  ]);
  const [loading, setLoading] = useState(true);

  const images = [
    "coffee.jpg",
    "dinner-dance-2.jpg",
    "dinner-dance.jpg",
    "dinner.jpg",
    "music-night-2.jpg",
    "music-night.jpg",
    "picnic-2.jpg",
    "picnic.jpg",
    "speed-dating.jpg",
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [profileData, statistics] = await Promise.all([
          organizerService.getProfile(user.id),
          eventService.getEventStatistics().catch(() => null),
        ]);
        setProfile(profileData);
        if (statistics) {
          setStats([
            {
              icon: "📅",
              number: String(statistics.totalEvents ?? 0),
              label: "Total Events",
              variant: "primary",
            },
            {
              icon: "✔",
              number: String(statistics.activeEvents ?? 0),
              label: "Active Events",
              variant: "success",
            },
            {
              icon: "👥",
              number: String(statistics.totalRegistrations ?? 0),
              label: "Total Registrations",
              variant: "info",
            },
            {
              icon: "⏳",
              number: String(statistics.pendingRegistrations ?? 0),
              label: "Pending Payments",
              variant: "warning",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching organizer profile:", error);
        // Inline "No profile data available" is shown; no toast to avoid duplicate feedback
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStats();
  }, [user?.id]);

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <p className="text-muted">No profile data available.</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Format location
  const location =
    profile.city && profile.state
      ? `${profile.city}, ${profile.state}`
      : profile.city || profile.state || "Not specified";

  // Format religion and caste
  const religionCaste =
    [profile.religion, profile.caste].filter(Boolean).join(", ") ||
    "Not specified";

  return (
    <Container fluid>
      {/* 1. Detail card (name, photo, age, religion, location, education, occupation) first */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <Image
                src="/assets/images/event-organizer/profile-pic.jpg"
                alt={profile.fullName || "Organizer"}
                rounded
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
                className="mb-3"
              />
            </Col>
            <Col md={9}>
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <h1 className="mb-0">
                  {profile.fullName ||
                    `${profile.firstName} ${profile.lastName}`}
                </h1>
                <i className="bi bi-patch-check-fill text-primary fs-4"></i>
                <Link
                  to={`${base}/edit-profile`}
                  className="btn btn-outline-danger btn-sm ms-auto"
                >
                  <i className="bi bi-pencil me-1"></i>Edit Profile
                </Link>
              </div>
              <p className="text-muted mb-3">ID: {profile.id}</p>

              <Row className="g-3">
                {profile.age && (
                  <Col md={6}>
                    <span>
                      📅 <strong>{profile.age} years</strong>
                    </span>
                  </Col>
                )}
                {religionCaste !== "Not specified" && (
                  <Col md={6}>
                    <span>
                      🕉️ <strong>{religionCaste}</strong>
                    </span>
                  </Col>
                )}
                {location !== "Not specified" && (
                  <Col md={6}>
                    <span>
                      📍 <strong>{location}</strong>
                    </span>
                  </Col>
                )}
                {profile.education && (
                  <Col md={6}>
                    <span>
                      🎓 <strong>{profile.education}</strong>
                    </span>
                  </Col>
                )}
                {profile.occupation && (
                  <Col md={6}>
                    <span>
                      💼 <strong>{profile.occupation}</strong>
                    </span>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 2. Stat cards (Total Events, Active Events, etc.) */}
      <Row className="g-4 mb-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
                <h2 className={`text-${stat.variant} mb-2`}>{stat.number}</h2>
                <p className="text-muted mb-0 small">{stat.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 3. About Me, Photo Gallery, Contact */}
      <Row>
        <Col lg={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                About Me
              </h3>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                {profile.aboutMe || "No description available."}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                Photo Gallery
              </h3>
              <Row className="g-2">
                {images.map((img, idx) => (
                  <Col xs={4} md={3} key={idx}>
                    <Image
                      src={`/assets/images/event-organizer/${img}`}
                      alt={`Photo ${idx + 1}`}
                      rounded
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => openLightbox(idx)}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Contact Information</h4>
              {profile.phone && (
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                  <span style={{ fontSize: "1.5rem" }}>📞</span>
                  <div>
                    <div className="small text-muted">Phone</div>
                    <div className="fw-semibold">{profile.phone}</div>
                  </div>
                </div>
              )}
              {profile.email && (
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                  <span style={{ fontSize: "1.5rem" }}>📧</span>
                  <div>
                    <div className="small text-muted">Email</div>
                    <div className="fw-semibold">{profile.email}</div>
                  </div>
                </div>
              )}
              {profile.totalEvents !== undefined && (
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                  <span style={{ fontSize: "1.5rem" }}>📅</span>
                  <div>
                    <div className="small text-muted">Total Events</div>
                    <div className="fw-semibold">{profile.totalEvents}</div>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lightbox Modal */}
      <Modal
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
        size="xl"
        centered
      >
        <Modal.Body className="bg-dark text-center p-0">
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-3"
            onClick={() => setShowLightbox(false)}
            style={{ zIndex: 1 }}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
          <Image
            src={`/assets/images/event-organizer/${images[currentImage]}`}
            style={{ maxHeight: "90vh", maxWidth: "100%" }}
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
    </Container>
  );
};
