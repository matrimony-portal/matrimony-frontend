import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { eventService } from "../../../services/eventService.js";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const OrganizerEvents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    eventId: null,
    eventTitle: "",
  });

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      const [eventsData, statsData] = await Promise.all([
        eventService.getMyEvents(),
        eventService.getEventStatistics(),
      ]);
      setEvents(eventsData);
      setStatistics(statsData);
    } catch (error) {
      console.error("Error loading events:", error);
      // Error results in empty list; no toast to avoid random popups
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleDeleteClick = (eventId, eventTitle) => {
    setDeleteModal({ show: true, eventId, eventTitle });
  };

  const handleDeleteConfirm = async () => {
    const { eventId } = deleteModal;
    setDeleteModal({ show: false, eventId: null, eventTitle: "" });

    try {
      setDeletingEventId(eventId);
      await eventService.deleteEvent(eventId);
      toast.success("Event cancelled successfully");
      await loadEvents();
    } catch (error) {
      console.error("Error cancelling event:", error);
      toast.error(error.response?.data?.message || "Failed to cancel event");
    } finally {
      setDeletingEventId(null);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await eventService.updateEventStatus(eventId, newStatus);
      toast.success("Event status updated successfully");
      loadEvents();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update event status",
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "UPCOMING":
        return "bg-primary";
      case "ONGOING":
        return "bg-success";
      case "COMPLETED":
        return "bg-secondary";
      case "CANCELLED":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <ConfirmationModal
        show={deleteModal.show}
        title="Cancel Event"
        message={`Cancel "${deleteModal.eventTitle}"? All participants will be notified.`}
        variant="danger"
        confirmText="Cancel Event"
        onConfirm={handleDeleteConfirm}
        onCancel={() =>
          setDeleteModal({ show: false, eventId: null, eventTitle: "" })
        }
      />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Events</h2>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/dashboard/organizer/create-event")}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Create New Event
        </button>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {statistics.totalEvents || 0}
                </h5>
                <p className="card-text text-muted mb-0">Total Events</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-success">
                  {statistics.activeEvents || 0}
                </h5>
                <p className="card-text text-muted mb-0">Active Events</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-info">
                  {statistics.totalRegistrations || 0}
                </h5>
                <p className="card-text text-muted mb-0">Total Registrations</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-warning">
                  {statistics.paidRegistrations || 0}
                </h5>
                <p className="card-text text-muted mb-0">Paid Registrations</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <h5 className="text-muted">No events yet</h5>
            <p className="text-muted">
              Create your first event to get started!
            </p>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/dashboard/organizer/create-event")}
            >
              Create Event
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {events.map((event) => (
            <div key={event.id} className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title mb-1">{event.title}</h5>
                      <span
                        className={`badge ${getStatusBadgeClass(event.status)} me-2`}
                      >
                        {event.status}
                      </span>
                      <small className="text-muted">
                        {formatDate(event.eventDate)}
                      </small>
                    </div>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          navigate(
                            `/dashboard/organizer/events/${event.id}/registrations`,
                          )
                        }
                      >
                        <i className="bi bi-people me-1"></i>
                        Registrations ({event.currentParticipants || 0}/
                        {event.maxParticipants || "∞"})
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          navigate(
                            `/dashboard/organizer/events/${event.id}/edit`,
                          )
                        }
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteClick(event.id, event.title)}
                        disabled={deletingEventId === event.id}
                      >
                        {deletingEventId === event.id ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : (
                          <>
                            <i className="bi bi-x-circle me-1"></i>
                            Cancel
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="card-text">{event.description}</p>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {event.venue}, {event.city}, {event.state}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <small className="text-muted">
                        <i className="bi bi-currency-rupee me-1"></i>
                        Registration Fee: ₹{event.registrationFee || 0}
                      </small>
                    </div>
                  </div>

                  {/* Status Change Dropdown */}
                  <div className="d-flex align-items-center gap-2">
                    <label className="small mb-0">Change Status:</label>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "auto" }}
                      value={event.status}
                      onChange={(e) =>
                        handleStatusChange(event.id, e.target.value)
                      }
                    >
                      <option value="UPCOMING">Upcoming</option>
                      <option value="ONGOING">Ongoing</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizerEvents;
