import { useState, useEffect } from "react";
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
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { eventService } from "../../../services/eventService.js";
import { toast } from "react-toastify";

export const MyEventsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentOrganizerId = user?.id;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        toast.error("Failed to load events");
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

  const getStatusVariant = (status) => {
    const variants = {
      upcoming: "primary",
      ongoing: "success",
      completed: "secondary",
      cancelled: "danger",
    };
    return variants[status?.toLowerCase()] || "secondary";
  };

  const handleDelete = async (eventId) => {
    if (
      !window.confirm("Cancel this event? All participants will be notified.")
    ) {
      return;
    }
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
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 className="mb-0">My Events</h2>
            <Button
              variant="danger"
              onClick={() => navigate("/dashboard/organizer/create-event")}
            >
              Create New Event
            </Button>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-3">
                You haven't created any events yet.
              </p>
              <Button
                variant="danger"
                onClick={() => navigate("/dashboard/organizer/create-event")}
              >
                Create Your First Event
              </Button>
            </div>
          ) : (
            <Row className="g-4">
              {events.map((event) => (
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
                        height: "180px",
                        backgroundImage: event.image
                          ? `url(${event.image})`
                          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderTopLeftRadius: "calc(0.375rem - 1px)",
                        borderTopRightRadius: "calc(0.375rem - 1px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {!event.image && event.title?.charAt(0)}
                    </div>
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Badge
                        bg={getStatusVariant(event.status)}
                        className="mb-3"
                      >
                        {event.status || "UPCOMING"}
                      </Badge>
                      <div className="text-muted small mb-3">
                        <div>
                          📍 {event.city}, {event.state}
                        </div>
                        <div>📅 {formatDate(event.eventDate)}</div>
                        <div>⏰ {formatTime(event.eventDate)}</div>
                        <div>
                          👥{" "}
                          {event.maxParticipants
                            ? `Max ${event.maxParticipants} participants`
                            : "Unlimited"}
                        </div>
                        {event.registrationFee && (
                          <div>💰 ₹{event.registrationFee}</div>
                        )}
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
                          onClick={() => handleDelete(event.id)}
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
