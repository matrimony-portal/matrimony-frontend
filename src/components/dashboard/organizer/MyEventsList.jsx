import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { eventService } from "../../../services/eventService.js";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const FILTER_CURRENT_UPCOMING = "current-upcoming";
const FILTER_ALL = "all";

export const MyEventsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentOrganizerId = user?.id;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    eventId: null,
  });
  const [filter, setFilter] = useState(FILTER_CURRENT_UPCOMING);

  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!currentOrganizerId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await eventService.getMyEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching my events:", err);
        setError("Failed to load your events. Please try again later.");
        // Inline error is shown; no toast to avoid duplicate feedback
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [currentOrganizerId]);

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const DEFAULT_IMAGE =
    "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg";

  const getStatusVariant = (status) => {
    const variants = {
      upcoming: "primary",
      ongoing: "success",
      completed: "secondary",
      cancelled: "danger",
    };
    return variants[status?.toLowerCase()] || "secondary";
  };

  const filteredEvents = useMemo(() => {
    if (filter === FILTER_ALL) return events;
    return events.filter(
      (e) => e.status === "UPCOMING" || e.status === "ONGOING",
    );
  }, [events, filter]);

  const handleDeleteClick = (eventId) => {
    setDeleteModal({ show: true, eventId });
  };

  const handleDeleteConfirm = async () => {
    const eventId = deleteModal.eventId;
    setDeleteModal({ show: false, eventId: null });
    try {
      await eventService.deleteEvent(eventId);
      toast.success("Event cancelled successfully");
      // Refresh events list
      const data = await eventService.getMyEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to cancel event");
    }
  };

  if (loading) {
    return (
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <Spinner animation="border" variant="danger" />
            <p className="mt-3 text-muted">Loading your events...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Body>
            <Alert variant="danger">{error}</Alert>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid>
      <ConfirmationModal
        show={deleteModal.show}
        title="Cancel Event"
        message="Cancel this event? All participants will be notified."
        variant="danger"
        confirmText="Cancel Event"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ show: false, eventId: null })}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 className="mb-0">My Events</h2>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Form.Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value={FILTER_CURRENT_UPCOMING}>
                  Current &amp; Upcoming
                </option>
                <option value={FILTER_ALL}>All</option>
              </Form.Select>
              <Button
                variant="danger"
                onClick={() => navigate("/dashboard/organizer/create-event")}
              >
                Create New Event
              </Button>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-3">
                {events.length === 0
                  ? "You haven't created any events yet."
                  : 'No current or upcoming events. Use "All" to see completed/cancelled.'}
              </p>
              {events.length === 0 && (
                <Button
                  variant="danger"
                  onClick={() => navigate("/dashboard/organizer/create-event")}
                >
                  Create Your First Event
                </Button>
              )}
            </div>
          ) : (
            <Row className="g-4">
              {filteredEvents.map((event) => (
                <Col key={event.id} xs={12} md={6} lg={4}>
                  <Card
                    className="h-100 shadow-sm"
                    style={{ transition: "all 0.3s" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 5px 20px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div
                      style={{
                        height: "160px",
                        backgroundImage: `url(${event.imageUrl || event.image || DEFAULT_IMAGE})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderTopLeftRadius: "calc(0.375rem - 1px)",
                        borderTopRightRadius: "calc(0.375rem - 1px)",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="small">{event.title}</Card.Title>
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        <Badge bg={getStatusVariant(event.status)}>
                          {event.status || "UPCOMING"}
                        </Badge>
                        {event.eventType && (
                          <Badge bg="secondary">{event.eventType}</Badge>
                        )}
                      </div>
                      <div className="text-muted small mb-3">
                        {event.venue && <div>📍 {event.venue}</div>}
                        <div>
                          🏙️ {event.city}
                          {event.state ? `, ${event.state}` : ""}
                        </div>
                        <div>
                          📅 {formatDate(event.eventDate)} · ⏰{" "}
                          {formatTime(event.eventDate)}
                        </div>
                        <div>
                          👥 {event.currentParticipants ?? 0}/
                          {event.maxParticipants ?? "—"}
                        </div>
                        <div>
                          💰{" "}
                          {event.registrationFee != null
                            ? `₹${event.registrationFee}`
                            : "Free"}
                        </div>
                      </div>
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() =>
                            navigate(
                              `/dashboard/organizer/event-edit/${event.id}`,
                            )
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="flex-fill"
                          onClick={() =>
                            navigate(
                              `/dashboard/organizer/event-view/${event.id}`,
                            )
                          }
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleDeleteClick(event.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
