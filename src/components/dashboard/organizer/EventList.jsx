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
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { eventService } from "../../../services/eventService.js";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const DEFAULT_IMAGE =
  "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg";

const EVENT_TYPES = [
  { value: "", label: "All Types" },
  { value: "SPEED_DATING", label: "Speed Dating" },
  { value: "COFFEE_MEETUP", label: "Coffee Meetup" },
  { value: "DINNER", label: "Dinner Event" },
  { value: "CULTURAL", label: "Cultural Evening" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const DATE_OPTIONS = [
  { value: "", label: "Anytime" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "past", label: "Past Events" },
];

const PRICE_OPTIONS = [
  { value: "", label: "Any Price" },
  { value: "free", label: "Free" },
  { value: "0-500", label: "₹0 – ₹500" },
  { value: "500-1000", label: "₹500 – ₹1000" },
  { value: "1000+", label: "₹1000+" },
];

function formatDate(dateString) {
  if (!dateString) return { date: "TBD", day: "—", month: "—" };
  const d = new Date(dateString);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
  };
}

function formatTime(dateString) {
  if (!dateString) return "TBD";
  return new Date(dateString).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getStatusVariant(status) {
  const s = (status || "").toLowerCase();
  if (s === "upcoming") return "primary";
  if (s === "ongoing") return "success";
  if (s === "completed") return "secondary";
  if (s === "cancelled") return "danger";
  return "secondary";
}

function isInPriceRange(fee, range) {
  const f = fee == null ? 0 : Number(fee);
  switch (range) {
    case "free":
      return f <= 0;
    case "0-500":
      return f >= 0 && f <= 500;
    case "500-1000":
      return f > 500 && f <= 1000;
    case "1000+":
      return f > 1000;
    default:
      return true;
  }
}

function isInDateRange(iso, range) {
  if (!range || !iso) return true;
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const monthEnd = new Date(today);
  monthEnd.setMonth(monthEnd.getMonth() + 1);

  switch (range) {
    case "week":
      return d >= today && d < weekEnd;
    case "month":
      return d >= today && d < monthEnd;
    case "past":
      return d < today;
    default:
      return true;
  }
}

export const OverallEventsList = () => {
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
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [priceRange, setPriceRange] = useState("");
  // By default hide my events: show only other organizers' events
  const [showMyEvents, setShowMyEvents] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const cities = useMemo(() => {
    const set = new Set();
    events.forEach((e) => {
      if (e.city && String(e.city).trim()) set.add(String(e.city).trim());
    });
    return Array.from(set).sort();
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      // By default exclude my events (show only other organizers')
      if (
        !showMyEvents &&
        currentOrganizerId != null &&
        e.organizerId === currentOrganizerId
      )
        return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          (e.title || "").toLowerCase().includes(q) ||
          (e.organizerName || "").toLowerCase().includes(q) ||
          (e.venue || "").toLowerCase().includes(q) ||
          (e.city || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      if (eventType && (e.eventType || "") !== eventType) return false;
      if (city && (e.city || "").trim() !== city) return false;
      if (status && (e.status || "UPCOMING").toUpperCase() !== status)
        return false;
      if (!isInDateRange(e.eventDate, dateRange)) return false;
      if (!isInPriceRange(e.registrationFee, priceRange)) return false;
      return true;
    });
  }, [
    events,
    showMyEvents,
    currentOrganizerId,
    search,
    eventType,
    city,
    status,
    dateRange,
    priceRange,
  ]);

  const hasActiveFilters =
    search ||
    eventType ||
    city ||
    status ||
    dateRange ||
    priceRange ||
    showMyEvents;

  const resetFilters = () => {
    setSearch("");
    setEventType("");
    setCity("");
    setStatus("");
    setDateRange("");
    setPriceRange("");
    setShowMyEvents(false);
  };

  const handleDeleteClick = (eventId) => {
    setDeleteModal({ show: true, eventId });
  };

  const handleDeleteConfirm = async () => {
    const eventId = deleteModal.eventId;
    setDeleteModal({ show: false, eventId: null });
    try {
      await eventService.deleteEvent(eventId);
      toast.success("Event cancelled successfully");
      const data = await eventService.getEvents();
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
            <p className="mt-3 text-muted">Loading events...</p>
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

      <div className="d-flex flex-column flex-lg-row gap-4">
        {/* Filters sidebar – reference: pages/event-organizer/events.html */}
        <aside
          className="flex-shrink-0"
          style={{ width: "100%", maxWidth: 320 }}
        >
          <Card className="shadow-sm sticky-top" style={{ top: "1rem" }}>
            <Card.Body>
              <h5
                className="mb-3"
                style={{
                  borderBottom: "2px solid #ae1700",
                  paddingBottom: "0.35rem",
                  color: "#333",
                }}
              >
                <i className="bi bi-funnel me-2" />
                Filters
              </h5>

              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="show-my-events"
                  label="Include my events"
                  checked={showMyEvents}
                  onChange={(e) => setShowMyEvents(e.target.checked)}
                  className="small"
                />
                <Form.Text className="text-muted">
                  By default only other organizers&apos; events are shown.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Search
                </Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text>
                    <i className="bi bi-search" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Title, venue, city, organizer…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Event Type
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  {EVENT_TYPES.map((o) => (
                    <option key={o.value || "all"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  City
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Status
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value || "all"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Date
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  {DATE_OPTIONS.map((o) => (
                    <option key={o.value || "any"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Price
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  {PRICE_OPTIONS.map((o) => (
                    <option key={o.value || "any"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {hasActiveFilters && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={resetFilters}
                >
                  <i className="bi bi-arrow-counterclockwise me-1" /> Reset
                </Button>
              )}
            </Card.Body>
          </Card>
        </aside>

        {/* Main: header + grid */}
        <div className="flex-grow-1 min-w-0">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-0">
                <div>
                  <h2 className="mb-1" style={{ color: "#333" }}>
                    Overall Events
                  </h2>
                  <p className="text-muted small mb-0">
                    Showing {filtered.length} of {events.length} events
                    {hasActiveFilters && " (filtered)"}
                  </p>
                </div>
                <Button
                  variant="danger"
                  style={{ background: "#ae1700", borderColor: "#ae1700" }}
                  onClick={() => navigate("/dashboard/organizer/create-event")}
                >
                  <i className="bi bi-plus-lg me-1" /> Create New Event
                </Button>
              </div>
            </Card.Body>
          </Card>

          {events.length === 0 ? (
            <Card className="shadow-sm">
              <Card.Body className="text-center py-5">
                <p className="text-muted mb-3">
                  No events found. Create your first event!
                </p>
                <Button
                  variant="danger"
                  style={{ background: "#ae1700", borderColor: "#ae1700" }}
                  onClick={() => navigate("/dashboard/organizer/create-event")}
                >
                  Create Event
                </Button>
              </Card.Body>
            </Card>
          ) : filtered.length === 0 ? (
            <Card className="shadow-sm">
              <Card.Body className="text-center py-5">
                <p className="text-muted mb-2">No events match your filters.</p>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={resetFilters}
                >
                  Reset filters
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {filtered.map((event) => {
                const isOwn = event.organizerId === currentOrganizerId;
                const { day, month, date } = formatDate(event.eventDate);
                const imageUrl = event.imageUrl || event.image || DEFAULT_IMAGE;
                const fee =
                  event.registrationFee != null && event.registrationFee > 0
                    ? `₹${event.registrationFee}`
                    : "Free";
                const spots =
                  event.maxParticipants != null
                    ? event.maxParticipants - (event.currentParticipants ?? 0)
                    : null;

                return (
                  <Col key={event.id} xs={12} md={6} xl={4}>
                    <Card
                      className="h-100 shadow-sm border"
                      style={{
                        transition: "all 0.3s ease",
                        borderColor: "rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        borderRadius: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      {/* Image with date overlay – events.html style */}
                      <div
                        style={{
                          height: 200,
                          backgroundImage: `url("${imageUrl}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                      >
                        <Badge
                          bg={getStatusVariant(event.status)}
                          className="position-absolute top-0 start-0 m-2"
                          style={{ fontWeight: 600 }}
                        >
                          {event.status || "UPCOMING"}
                        </Badge>
                        <div
                          className="position-absolute top-0 end-0 m-2 text-center rounded px-2 py-1"
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            color: "#333",
                            minWidth: 48,
                          }}
                        >
                          <span
                            className="d-block lh-1 fw-bold"
                            style={{ fontSize: "1.1rem" }}
                          >
                            {day}
                          </span>
                          <span className="d-block small">{month}</span>
                        </div>
                      </div>

                      <Card.Body className="d-flex flex-column">
                        <Card.Title
                          className="mb-2"
                          style={{ fontSize: "1.1rem", color: "#333" }}
                        >
                          {event.title}
                        </Card.Title>

                        {/* Organizer: clickable badge for other organizers only */}
                        <div className="mb-2">
                          {isOwn ? (
                            <Badge
                              bg="light"
                              text="dark"
                              style={{
                                fontWeight: 500,
                                border: "1px solid #dee2e6",
                              }}
                            >
                              <i className="bi bi-person-check me-1" /> My Event
                            </Badge>
                          ) : event.organizerName && event.organizerId ? (
                            <button
                              type="button"
                              className="badge border-0 text-decoration-none"
                              style={{
                                background: "#0d6efd",
                                color: "white",
                                fontWeight: 500,
                                cursor: "pointer",
                                padding: "0.35em 0.65em",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/dashboard/organizer/organizer-profile/${event.organizerId}`,
                                );
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#0b5ed7";
                                e.currentTarget.style.textDecoration =
                                  "underline";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#0d6efd";
                                e.currentTarget.style.textDecoration = "none";
                              }}
                            >
                              <i className="bi bi-person-circle me-1" />
                              {event.organizerName}
                            </button>
                          ) : event.organizerName ? (
                            <span className="text-muted small">
                              {event.organizerName}
                            </span>
                          ) : null}
                        </div>

                        {event.eventType && (
                          <Badge
                            bg="secondary"
                            className="mb-2 align-self-start"
                          >
                            {event.eventType.replace(/_/g, " ")}
                          </Badge>
                        )}

                        <div className="text-muted small mb-3 flex-grow-1">
                          {event.venue && (
                            <div className="d-flex align-items-center gap-1">
                              <i
                                className="bi bi-geo-alt"
                                style={{ color: "#ae1700" }}
                              />
                              {[event.venue, event.city, event.state]
                                .filter(Boolean)
                                .join(", ") || "—"}
                            </div>
                          )}
                          <div className="d-flex align-items-center gap-1 mt-1">
                            <i
                              className="bi bi-clock"
                              style={{ color: "#ae1700" }}
                            />
                            {date} · {formatTime(event.eventDate)}
                          </div>
                          <div className="d-flex justify-content-between mt-1">
                            <span>
                              <i
                                className="bi bi-people me-1"
                                style={{ color: "#ae1700" }}
                              />
                              {event.currentParticipants ?? 0} /{" "}
                              {event.maxParticipants ?? "—"} registered
                            </span>
                            <span>
                              <i
                                className="bi bi-currency-rupee me-1"
                                style={{ color: "#ae1700" }}
                              />
                              {fee}
                            </span>
                          </div>
                        </div>

                        {/* Stats bar – events.html style */}
                        {spots != null && spots >= 0 && (
                          <div
                            className="d-flex justify-content-between py-2 px-2 mb-2 rounded"
                            style={{
                              background: "#f8fafc",
                              fontSize: "0.875rem",
                            }}
                          >
                            <span>
                              <strong style={{ color: "#ae1700" }}>
                                {event.currentParticipants ?? 0}/
                                {event.maxParticipants}
                              </strong>{" "}
                              Registered
                            </span>
                            <span>
                              <strong style={{ color: "#ae1700" }}>
                                {spots}
                              </strong>{" "}
                              Spots left
                            </span>
                          </div>
                        )}

                        <div className="d-flex gap-2 flex-wrap">
                          {isOwn ? (
                            <>
                              <Button
                                variant="danger"
                                size="sm"
                                className="flex-fill"
                                style={{
                                  background: "#ae1700",
                                  borderColor: "#ae1700",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/dashboard/organizer/event-edit/${event.id}`,
                                  )
                                }
                              >
                                <i className="bi bi-pencil me-1" /> Edit
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
                            </>
                          ) : (
                            <Button
                              variant="danger"
                              size="sm"
                              className="w-100"
                              style={{
                                background: "#ae1700",
                                borderColor: "#ae1700",
                              }}
                              onClick={() =>
                                navigate(
                                  `/dashboard/organizer/event-view/${event.id}`,
                                )
                              }
                            >
                              <i className="bi bi-eye me-1" /> View Details
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </div>
    </Container>
  );
};
