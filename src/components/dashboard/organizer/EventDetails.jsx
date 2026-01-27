import { useNavigate, useParams } from "react-router";
import {
  Container,
  Card,
  Button,
  Badge,
  Spinner,
  Table,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { toast } from "../../../utils/toast.js";
import { eventService } from "../../../services/eventService.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const DEFAULT_IMAGE =
  "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg";

function formatEventDate(iso) {
  if (!iso) return { date: "—", time: "—" };
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };
}

function formatRegDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusLabel = {
  PENDING: "Pending",
  PAID: "Accepted",
  REFUNDED: "Rejected",
};
const statusVariant = {
  PENDING: "warning",
  PAID: "success",
  REFUNDED: "secondary",
};

function InfoRow({ icon, label, value, last }) {
  return (
    <div
      className={`d-flex align-items-center py-3 ${last ? "" : "border-bottom border-secondary border-opacity-25"}`}
    >
      <i
        className={`bi ${icon}`}
        style={{
          fontSize: "1.25rem",
          color: "#ae1700",
          width: 40,
          textAlign: "center",
        }}
      />
      <div className="flex-grow-1 ms-3">
        <div className="small text-muted">{label}</div>
        <div className="fw-semibold">{value}</div>
      </div>
    </div>
  );
}

export const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regLoading, setRegLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
    variant: "primary",
  });

  const loadEvent = useCallback(async () => {
    try {
      const data = await eventService.getEventById(eventId);
      setEvent(data);
      return data;
    } catch (e) {
      setError(
        e.response?.data?.message || e.message || "Failed to load event",
      );
      // Inline error is shown; no toast to avoid duplicate feedback
      return null;
    }
  }, [eventId]);

  const loadRegistrations = useCallback(async () => {
    setRegLoading(true);
    try {
      const data = await eventService.getEventRegistrations(eventId);
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load registrations:", e);
      // Inline empty/error state is shown; no toast to avoid duplicate feedback
    } finally {
      setRegLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const ev = await loadEvent();
        if (cancelled) return;
        // Only load registrations for own events; other organizers cannot see the list
        if (ev && ev.organizerId === user?.id) {
          await loadRegistrations();
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [eventId, loadEvent, loadRegistrations, user?.id]);

  const closeModal = () => setModal((m) => ({ ...m, show: false }));

  const handleExport = useCallback(() => {
    if (!event) return;
    const escape = (v) => {
      const s = String(v ?? "").replace(/"/g, '""');
      return `"${s}"`;
    };
    const headers = ["Name", "Email", "Requested", "Status"];
    const rows = registrations.map((r) => [
      r.userName ?? "",
      r.userEmail ?? "",
      formatRegDate(r.registrationDate),
      statusLabel[r.paymentStatus] ?? r.paymentStatus ?? "",
    ]);
    const csv = [
      headers.map(escape).join(","),
      ...rows.map((r) => r.map(escape).join(",")),
    ].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(event.title || "event")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50)}-participants.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Participant list exported.");
  }, [event, registrations]);

  const handleAccept = (reg) => {
    setModal({
      show: true,
      title: "Accept Request",
      message: `Accept ${reg.userName}'s registration for this event? They will be notified.`,
      variant: "success",
      onConfirm: async () => {
        closeModal();
        try {
          await eventService.updateRegistrationPaymentStatus(reg.id, "PAID");
          toast.success("Request accepted! Participant will be notified.");
          await loadEvent();
          await loadRegistrations();
        } catch (e) {
          toast.error(
            e.response?.data?.message || e.message || "Failed to accept.",
          );
        }
      },
    });
  };

  const handleReject = (reg) => {
    setModal({
      show: true,
      title: "Reject Request",
      message: `Reject ${reg.userName}'s registration? Money will be refunded.`,
      variant: "danger",
      onConfirm: async () => {
        closeModal();
        try {
          await eventService.updateRegistrationPaymentStatus(
            reg.id,
            "REFUNDED",
          );
          toast.success("Request rejected. Money will be refunded.");
          await loadEvent();
          await loadRegistrations();
        } catch (e) {
          toast.error(
            e.response?.data?.message || e.message || "Failed to reject.",
          );
        }
      },
    });
  };

  if (loading) {
    return (
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <Spinner animation="border" variant="danger" />
            <p className="mt-3 text-muted">Loading event...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Body>
            <p className="text-danger mb-0">{error || "Event not found."}</p>
            <Button
              variant="outline-danger"
              className="mt-3"
              onClick={() => navigate("/dashboard/organizer/my-events")}
            >
              ← Back to My Events
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const { date, time } = formatEventDate(event.eventDate);
  const imageUrl = event.imageUrl || event.image || DEFAULT_IMAGE;
  const participants = `${event.currentParticipants ?? 0}/${event.maxParticipants ?? "—"}`;

  return (
    <Container fluid>
      <ConfirmationModal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
        onConfirm={modal.onConfirm}
        onCancel={closeModal}
      />

      {/* Page header - matches event-view.html */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none mb-2"
            style={{ color: "#ae1700", fontWeight: 600 }}
            onClick={() => navigate("/dashboard/organizer/my-events")}
          >
            <i className="bi bi-arrow-left me-1" /> Back to My Events
          </button>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <h1 className="mb-0">{event.title}</h1>
            <span
              className={`badge rounded-pill ${
                (event.status ?? "UPCOMING") === "UPCOMING"
                  ? "bg-primary"
                  : event.status === "ONGOING"
                    ? "bg-success"
                    : "bg-secondary"
              }`}
            >
              {event.status ?? "UPCOMING"}
            </span>
            {event.eventType && <Badge bg="secondary">{event.eventType}</Badge>}
          </div>
        </Card.Body>
      </Card>

      {/* Event banner - matches event-view.html (300px) */}
      <div
        className="rounded mb-4 shadow-sm"
        style={{
          height: "300px",
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Event Details - info-row layout from event-view.html */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Event Details</h3>
          <InfoRow
            icon="bi-geo-alt"
            label="Location"
            value={
              [event.venue, event.city, event.state]
                .filter(Boolean)
                .join(", ") || "—"
            }
          />
          <InfoRow icon="bi-calendar-event" label="Date" value={date} />
          <InfoRow icon="bi-clock" label="Time" value={time} />
          <InfoRow
            icon="bi-people"
            label="Participants"
            value={`${participants} Registered`}
          />
          <InfoRow
            icon="bi-currency-rupee"
            label="Registration"
            value={
              event.registrationFee != null && event.registrationFee > 0
                ? `₹${event.registrationFee}`
                : "Free"
            }
            last={!event.description}
          />
          {event.description && (
            <InfoRow
              icon="bi-info-circle"
              label="Description"
              value={event.description}
              last
            />
          )}
          {user?.id === event?.organizerId && (
            <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
              <Button
                variant="danger"
                onClick={() =>
                  navigate(`/dashboard/organizer/event-edit/${eventId}`)
                }
              >
                <i className="bi bi-pencil me-1" /> Edit Event
              </Button>
              <Button
                variant="outline-danger"
                onClick={() =>
                  setModal({
                    show: true,
                    title: "Cancel Event",
                    message:
                      "Cancel this event? All participants will be notified.",
                    variant: "danger",
                    onConfirm: async () => {
                      closeModal();
                      try {
                        await eventService.deleteEvent(eventId);
                        toast.success("Event cancelled.");
                        navigate("/dashboard/organizer/my-events");
                      } catch (e) {
                        toast.error(
                          e.response?.data?.message || "Failed to cancel.",
                        );
                      }
                    },
                  })
                }
              >
                <i className="bi bi-x-circle me-1" /> Cancel Event
              </Button>
              <Button variant="outline-secondary" onClick={handleExport}>
                <i className="bi bi-download me-1" /> Export List
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {user?.id === event?.organizerId && (
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="mb-4">Registered Participants</h3>
            {regLoading ? (
              <div className="text-center py-4">
                <Spinner animation="border" size="sm" />
                <p className="mt-2 text-muted mb-0">Loading...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Requested</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          No registrations or requests yet.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((r) => (
                        <tr key={r.id}>
                          <td>{r.userName ?? "—"}</td>
                          <td>{r.userEmail ?? "—"}</td>
                          <td>{formatRegDate(r.registrationDate)}</td>
                          <td>
                            <Badge
                              bg={statusVariant[r.paymentStatus] || "secondary"}
                            >
                              {statusLabel[r.paymentStatus] ?? r.paymentStatus}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2 flex-wrap align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/organizer/participant-profile/${r.id}`,
                                  )
                                }
                              >
                                View Profile
                              </Button>
                              {r.paymentStatus === "PENDING" && (
                                <>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleAccept(r)}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleReject(r)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};
