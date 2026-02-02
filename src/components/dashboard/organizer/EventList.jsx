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

export const OverallEventsList = ({ compact = false }) => {
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
      if (status && getDisplayStatus(e) !== status) return false;
      if (!isInDateRange(e.eventDate, dateRange)) return false;
      if (!isInPriceRange(e.registrationFee, priceRange)) return false;
      return true;
    });
  }, [
    events,
    search,
    eventType,
    city,
    status,
    dateRange,
    priceRange,
    currentOrganizerId,
    showMyEvents,
  ]);

  const handleDeleteClick = (eventId) => {
    setDeleteModal({ show: true, eventId });
  };

  const handleDeleteConfirm = async () => {
    try {
      await eventService.cancelEvent(deleteModal.eventId);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === deleteModal.eventId ? { ...e, status: "CANCELLED" } : e,
        ),
      );
      toast.success("Event cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling event:", err);
      toast.error("Failed to cancel event. Please try again.");
    } finally {
      setDeleteModal({ show: false, eventId: null });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setEventType("");
    setCity("");
    setStatus("");
    setDateRange("");
    setPriceRange("");
    setShowMyEvents(false);
  };

  const hasActiveFilters = !!(
    search ||
    eventType ||
    city ||
    status ||
    dateRange ||
    priceRange ||
    showMyEvents
  );

  const eventsBlock =
    filtered.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">
          <i className="bi bi-calendar-x" />
        </div>
        <h3 className="empty-title">No Events Found</h3>
        <p className="empty-text">
          {search ||
          eventType ||
          city ||
          status ||
          dateRange ||
          priceRange ||
          showMyEvents
            ? "Try adjusting your filters to see more events"
            : "No events available at the moment"}
        </p>
      </div>
    ) : (
      <Row className="g-4">
        {filtered.map((event) => {
          const { date, day, month } = formatDate(event.eventDate);
          const displayStatus = getDisplayStatus(event);
          const isOwn =
            currentOrganizerId != null &&
            event.organizerId === currentOrganizerId;
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
                  <div className="status-badge-overlay">{displayStatus}</div>
                  <div className="date-badge">
                    <div className="date-day">{day}</div>
                    <div className="date-month">{month}</div>
                  </div>
                </div>
                <div className="event-card-body d-flex flex-column">
                  <h5 className="event-title">{event.title}</h5>
                  <div className="mb-2">
                    {isOwn ? (
                      <span className="organizer-badge own-event">
                        <i className="bi bi-person-check" />
                        My Event
                      </span>
                    ) : event.organizerId ? (
                      <span
                        className="organizer-badge other-event"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/dashboard/organizer/organizer-profile/${event.organizerId}`,
                          );
                        }}
                      >
                        <i className="bi bi-person-circle" />
                        {event.organizerName || "View organizer"}
                      </span>
                    ) : event.organizerName ? (
                      <span className="text-muted small">
                        {event.organizerName}
                      </span>
                    ) : null}
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
                    {isOwn ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-primary-custom"
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
                          className="btn-secondary-custom"
                          style={{ visibility: "hidden" }}
                          aria-hidden="true"
                        >
                          <i className="bi bi-eye" />
                        </button>
                        <button
                          className="btn-cancel-custom"
                          style={{ visibility: "hidden" }}
                          aria-hidden="true"
                        >
                          <i className="bi bi-x-circle" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading events...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
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
        
        .date-day {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          color: #1a1a1a;
        }
        
        .date-month {
          font-size: 0.85rem;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
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
        
        .organizer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .organizer-badge.own-event {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        
        .organizer-badge.other-event {
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #bfdbfe;
          cursor: pointer;
        }
        
        .organizer-badge.other-event:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }
        
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
        
        .event-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 16px 0;
          color: #4b5563;
          font-size: 0.9rem;
        }
        
        .detail-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        
        .detail-icon {
          color: #dc2626;
          font-size: 1rem;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .stats-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 14px 16px;
          border-radius: 12px;
          margin-top: 16px;
          margin-bottom: 20px;
        }
        
        .stat-item {
          font-size: 0.875rem;
          color: #78350f;
        }
        
        .stat-value {
          font-weight: 700;
          color: #dc2626;
          font-size: 1rem;
        }
        
        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 16px;
        }
        
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
        
        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
        }
        
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
        
        .btn-secondary-custom:hover {
          border-color: #9ca3af;
          background: #f9fafb;
        }
        
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
        
        .btn-cancel-custom:hover {
          background: #fef2f2;
          border-color: #fecaca;
        }
        
        .filter-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .filter-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
        }
        
        .form-control, .form-select {
          border-radius: 10px;
          border: 2px solid #e5e7eb;
          padding: 10px 14px;
          transition: all 0.2s ease;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        
        .empty-icon {
          font-size: 4rem;
          color: #e5e7eb;
          margin-bottom: 20px;
        }
        
        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 12px;
        }
        
        .empty-text {
          color: #6b7280;
          font-size: 1rem;
        }
        
        .price-highlight {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
          color: #78350f;
          display: inline-block;
        }
      `}</style>

      <div className="container-lg">
        {compact ? (
          <div className="d-flex flex-column flex-lg-row gap-4">
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
                        placeholder="Search events..."
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
                      {EVENT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
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
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
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
                      {DATE_OPTIONS.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
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
                      {PRICE_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="show-my-events-sidebar"
                      label="Include my events"
                      checked={showMyEvents}
                      onChange={(e) => setShowMyEvents(e.target.checked)}
                    />
                    <Form.Text className="text-muted small d-block">
                      By default only other organizers&apos; events are shown.
                    </Form.Text>
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
                      />{" "}
                      Reset
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </aside>
            <div className="flex-grow-1 min-w-0">
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <h2 className="mb-1" style={{ color: "#333" }}>
                    Discover Events
                  </h2>
                  <p className="text-muted small mb-0">
                    Showing {filtered.length} of {events.length} events
                    {hasActiveFilters ? " (filtered)" : ""}
                  </p>
                </Card.Body>
              </Card>
              {eventsBlock}
            </div>
          </div>
        ) : (
          <>
            <div className="filter-container">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="filter-title mb-0">Discover Events</h2>
                <div>
                  <Form.Check
                    type="switch"
                    id="show-my-events"
                    label="Include my events"
                    checked={showMyEvents}
                    onChange={(e) => setShowMyEvents(e.target.checked)}
                  />
                  <Form.Text className="text-muted d-block small">
                    By default only other organizers&apos; events are shown.
                  </Form.Text>
                </div>
              </div>

              <Row className="g-3">
                <Col md={6} lg={4}>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        background: "white",
                        border: "2px solid #e5e7eb",
                        borderRight: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <i className="bi bi-search" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search events..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ borderLeft: "none" }}
                    />
                  </InputGroup>
                </Col>

                <Col md={6} lg={2}>
                  <Form.Select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={6} lg={2}>
                  <Form.Select
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
                </Col>

                <Col md={6} lg={2}>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={6} lg={2}>
                  <Form.Select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    {DATE_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={6} lg={2}>
                  <Form.Select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    {PRICE_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {(search ||
                  eventType ||
                  city ||
                  status ||
                  dateRange ||
                  priceRange ||
                  showMyEvents) && (
                  <Col xs={12}>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={resetFilters}
                      style={{
                        borderRadius: "8px",
                        fontWeight: 600,
                      }}
                    >
                      <i className="bi bi-x-circle me-1" /> Clear Filters
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
            {eventsBlock}
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={deleteModal.show}
        onHide={() => setDeleteModal({ show: false, eventId: null })}
        onConfirm={handleDeleteConfirm}
        title="Cancel Event"
        message="Are you sure you want to cancel this event? This action cannot be undone."
        confirmText="Yes, Cancel Event"
        cancelText="No, Keep Event"
      />
    </Container>
  );
};
