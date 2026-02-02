import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { eventService } from "../../../services/eventService.js";
import { toast } from "../../../utils/toast.js";
import { getDisplayStatus } from "../../../utils/eventStatus.js";
import { getDefaultEventImage } from "../../../utils/eventUtils.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const EVENT_TYPES = [
  { value: "", label: "All Types" },
  { value: "SPEED_DATING", label: "Speed Dating" },
  { value: "COFFEE_MEETUP", label: "Coffee Meetup" },
  { value: "DINNER", label: "Dinner Event" },
  { value: "CULTURAL", label: "Cultural Evening" },
];

const STATUS_OPTIONS = [
  { value: "current-upcoming", label: "Current & Upcoming" },
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
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("current-upcoming");
  const [dateRange, setDateRange] = useState("");
  const [priceRange, setPriceRange] = useState("");

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

  const cities = useMemo(() => {
    const set = new Set();
    events.forEach((e) => {
      if (e.city && String(e.city).trim()) set.add(String(e.city).trim());
    });
    return Array.from(set).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          (e.title || "").toLowerCase().includes(q) ||
          (e.venue || "").toLowerCase().includes(q) ||
          (e.city || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      if (eventType && (e.eventType || "") !== eventType) return false;
      if (city && (e.city || "").trim() !== city) return false;
      const d = getDisplayStatus(e);
      if (status === "current-upcoming" && d !== "UPCOMING" && d !== "ONGOING")
        return false;
      if (status && status !== "current-upcoming" && d !== status) return false;
      if (!isInDateRange(e.eventDate, dateRange)) return false;
      if (!isInPriceRange(e.registrationFee, priceRange)) return false;
      return true;
    });
  }, [events, search, eventType, city, status, dateRange, priceRange]);

  const hasActiveFilters =
    search ||
    eventType ||
    city ||
    status !== "current-upcoming" ||
    dateRange ||
    priceRange;

  const resetFilters = () => {
    setSearch("");
    setEventType("");
    setCity("");
    setStatus("current-upcoming");
    setDateRange("");
    setPriceRange("");
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
    <Container fluid className="py-4">
      <style>{`
        .event-card {
          border: none;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          background: white;
        }
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        .event-image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .event-card:hover .event-image {
          transform: scale(1.05);
        }
        .date-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: white;
          border-radius: 12px;
          padding: 8px 12px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          min-width: 70px;
        }
        .date-day { font-size: 1.5rem; font-weight: 700; line-height: 1.2; color: #1a1a1a; }
        .date-month { font-size: 0.85rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-badge-overlay {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #2563eb;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        .event-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }
        .event-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .organizer-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 0.875rem; font-weight: 500; transition: all 0.2s ease; }
        .organizer-badge.own-event { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .event-type-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          margin-top: 8px;
        }
        .event-details { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; color: #4b5563; font-size: 0.9rem; }
        .detail-row { display: flex; align-items: flex-start; gap: 10px; }
        .detail-icon { color: #dc2626; font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
        .action-buttons { display: flex; gap: 10px; margin-top: auto; padding-top: 16px; }
        .btn-primary-custom {
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 10px;
          border-radius: 10px;
          transition: all 0.2s ease;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .btn-primary-custom:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%); }
        .btn-secondary-custom {
          background: white;
          border: 2px solid #e5e7eb;
          color: #4b5563;
          font-weight: 600;
          padding: 10px;
          border-radius: 10px;
          transition: all 0.2s ease;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .btn-secondary-custom:hover { border-color: #9ca3af; background: #f9fafb; }
        .btn-cancel-custom {
          background: white;
          border: 2px solid #fee2e2;
          color: #dc2626;
          font-weight: 600;
          padding: 10px;
          border-radius: 10px;
          transition: all 0.2s ease;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .btn-cancel-custom:hover { background: #fef2f2; border-color: #fecaca; }
        .price-highlight {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
          color: #78350f;
          display: inline-block;
        }
      `}</style>
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
        {/* Filters sidebar */}
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
                <i className="bi bi-funnel me-2" aria-hidden="true" />
                Filters
              </h5>

              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Search
                </Form.Label>
                <InputGroup size="sm">
                  <InputGroup.Text>
                    <i className="bi bi-search" aria-hidden="true" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Title, venue, city…"
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
                  <i
                    className="bi bi-arrow-counterclockwise me-1"
                    aria-hidden="true"
                  />
                  Reset
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
                    My Events
                  </h2>
                  <p className="text-muted small mb-0">
                    Showing {filteredEvents.length} of {events.length} events
                    {hasActiveFilters && " (filtered)"}
                  </p>
                </div>
                <Button
                  variant="danger"
                  style={{ background: "#ae1700", borderColor: "#ae1700" }}
                  onClick={() => navigate("/dashboard/organizer/create-event")}
                >
                  <i className="bi bi-plus-lg me-1" aria-hidden="true" />
                  Create New Event
                </Button>
              </div>
            </Card.Body>
          </Card>

          {events.length === 0 ? (
            <Card className="shadow-sm">
              <Card.Body className="text-center py-5">
                <p className="text-muted mb-3">
                  You haven&apos;t created any events yet.
                </p>
                <Button
                  variant="danger"
                  style={{ background: "#ae1700", borderColor: "#ae1700" }}
                  onClick={() => navigate("/dashboard/organizer/create-event")}
                >
                  Create Your First Event
                </Button>
              </Card.Body>
            </Card>
          ) : filteredEvents.length === 0 ? (
            <Card className="shadow-sm">
              <Card.Body className="text-center py-5">
                <p className="text-muted mb-2">No events match your filters.</p>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={resetFilters}
                >
                  <i
                    className="bi bi-arrow-counterclockwise me-1"
                    aria-hidden="true"
                  />
                  Reset filters
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {filteredEvents.map((event) => {
                const { date, day, month } = formatDate(event.eventDate);
                const displayStatus = getDisplayStatus(event);
                const fee =
                  event.registrationFee == null || event.registrationFee <= 0
                    ? "Free"
                    : `₹${event.registrationFee}`;
                return (
                  <Col key={event.id} xs={12} sm={6} lg={4} className="d-flex">
                    <Card className="event-card w-100">
                      <div className="event-image-container">
                        <img
                          src={getDefaultEventImage(event)}
                          alt={event.title}
                          className="event-image"
                        />
                        <div className="status-badge-overlay">
                          {displayStatus}
                        </div>
                        <div className="date-badge">
                          <div className="date-day">{day}</div>
                          <div className="date-month">{month}</div>
                        </div>
                      </div>
                      <div className="event-card-body d-flex flex-column">
                        <h5 className="event-title">{event.title}</h5>
                        <div className="mb-2">
                          <span className="organizer-badge own-event">
                            <i className="bi bi-person-check" />
                            My Event
                          </span>
                        </div>
                        {event.eventType && (
                          <div className="event-type-badge">
                            {event.eventType.replace(/_/g, " ")}
                          </div>
                        )}
                        <div className="event-details">
                          {event.venue && (
                            <div className="detail-row">
                              <i className="bi bi-geo-alt-fill detail-icon" />
                              <span>
                                {[event.venue, event.city, event.state]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </div>
                          )}
                          <div className="detail-row">
                            <i className="bi bi-clock-fill detail-icon" />
                            <span>
                              {date} · {formatTime(event.eventDate)}
                            </span>
                          </div>
                          <div className="detail-row">
                            <i className="bi bi-people-fill detail-icon" />
                            <span>
                              {event.currentParticipants ?? 0} /{" "}
                              {event.maxParticipants ?? "—"} registered
                            </span>
                          </div>
                          <div className="detail-row">
                            <i className="bi bi-tag-fill detail-icon" />
                            <span className="price-highlight">{fee}</span>
                          </div>
                        </div>
                        <div className="action-buttons">
                          <button
                            className="btn-primary-custom"
                            onClick={() =>
                              navigate(
                                `/dashboard/organizer/event-edit/${event.id}`,
                              )
                            }
                            title="Edit"
                          >
                            <i className="bi bi-pencil" aria-hidden="true" />
                          </button>
                          <button
                            className="btn-secondary-custom"
                            onClick={() =>
                              navigate(
                                `/dashboard/organizer/event-view/${event.id}`,
                              )
                            }
                            title="View"
                          >
                            <i className="bi bi-eye" aria-hidden="true" />
                          </button>
                          <button
                            className="btn-cancel-custom"
                            onClick={() => handleDeleteClick(event.id)}
                            title="Cancel"
                          >
                            <i className="bi bi-x-circle" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
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
