import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { organizerService } from "../../services/organizerService.js";
import { eventService } from "../../services/eventService.js";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const ViewEventOrganizerProfile = () => {
  const navigate = useNavigate();
  const { organizerId } = useParams();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!organizerId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [profileData, eventsData] = await Promise.all([
          organizerService.getProfile(organizerId),
          eventService.getEventsByOrganizer(organizerId).catch(() => []),
        ]);
        setProfile(profileData);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (e) {
        console.error("Error loading organizer profile:", e);
        setError(
          e.response?.data?.message || e.message || "Failed to load profile",
        );
        // Inline error is shown in Card; no toast to avoid duplicate feedback
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [organizerId]);

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" />
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
          className="mb-3 p-0"
          style={{ color: "#ae1700" }}
        >
          <ArrowLeft size={20} className="me-2" />
          Back
        </Button>
        <Card>
          <Card.Body>
            <p className="text-danger mb-0">
              {error || "Organizer not found."}
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const location =
    [profile.city, profile.state].filter(Boolean).join(", ") || "Not specified";
  const name =
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Organizer";

  return (
    <Container fluid className="py-3 py-md-4">
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="text-decoration-none d-flex align-items-center gap-2 mb-3"
        style={{ color: "#ae1700", padding: 0 }}
      >
        <ArrowLeft size={20} />
        <span>Back to Events</span>
      </Button>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <img
                src="/assets/images/event-organizer/profile-pic.jpg"
                alt={name}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                className="mb-2"
              />
              <Badge bg="success">Verified Organizer</Badge>
            </Col>
            <Col md={9}>
              <h1 className="mb-2">{name}</h1>
              <p className="text-muted mb-3">
                {profile.occupation || "Event Organizer"}
              </p>
              <Row className="g-3 mb-3">
                <Col md={6}>
                  <span>
                    📍 <strong>{location}</strong>
                  </span>
                </Col>
                {profile.totalEvents != null && (
                  <Col md={6}>
                    <span>
                      📅 <strong>{profile.totalEvents} events</strong>
                    </span>
                  </Col>
                )}
              </Row>
              <Row className="g-2">
                <Col xs={6} md={3}>
                  <div className="text-center p-2 bg-light rounded">
                    <div className="h5 text-danger mb-0">
                      {profile.totalEvents ?? 0}
                    </div>
                    <small className="text-muted">Total Events</small>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center p-2 bg-light rounded">
                    <div className="h5 text-success mb-0">
                      {profile.upcomingEvents ?? 0}
                    </div>
                    <small className="text-muted">Upcoming</small>
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="text-center p-2 bg-light rounded">
                    <div className="h5 text-secondary mb-0">
                      {profile.completedEvents ?? 0}
                    </div>
                    <small className="text-muted">Completed</small>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={8}>
          {profile.aboutMe && (
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <h4 className="mb-3 pb-2 border-bottom border-danger border-2">
                  About
                </h4>
                <p className="text-muted mb-0" style={{ textAlign: "justify" }}>
                  {profile.aboutMe}
                </p>
              </Card.Body>
            </Card>
          )}

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h4 className="mb-3 pb-2 border-bottom border-danger border-2">
                Events
              </h4>
              {events.length === 0 ? (
                <p className="text-muted mb-0">No events yet.</p>
              ) : (
                <div className="list-group">
                  {events.slice(0, 10).map((ev) => (
                    <div
                      key={ev.id}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/dashboard/organizer/event-view/${ev.id}`)
                      }
                    >
                      <div>
                        <h6 className="mb-1">{ev.title}</h6>
                        <small className="text-muted">
                          {formatDate(ev.eventDate)} · {ev.city}
                          {ev.maxParticipants != null &&
                            ` · ${ev.currentParticipants ?? 0}/${ev.maxParticipants} participants`}
                        </small>
                      </div>
                      <Badge
                        bg={
                          ev.status === "UPCOMING"
                            ? "primary"
                            : ev.status === "ONGOING"
                              ? "success"
                              : "secondary"
                        }
                      >
                        {ev.status}
                      </Badge>
                    </div>
                  ))}
                  {events.length > 10 && (
                    <div className="list-group-item text-muted small">
                      + {events.length - 10} more
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">Contact</h5>
              {profile.phone && (
                <div className="d-flex align-items-center gap-3 p-2 bg-light rounded mb-2">
                  <span>📞</span>
                  <div className="fw-semibold">{profile.phone}</div>
                </div>
              )}
              {profile.email && (
                <div className="d-flex align-items-center gap-3 p-2 bg-light rounded mb-2">
                  <span>📧</span>
                  <div className="fw-semibold">{profile.email}</div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
