import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { eventService } from "../../../services/eventService.js";
import { handleApiError } from "../../../services/api.js";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

export const EventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("SPEED_DATING");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    duration: "3",
    venue: "",
    address: "",
    city: "",
    state: "",
    eventType: "SPEED_DATING",
    imageUrl: "",
    maxParticipants: "",
    registrationFee: "",
  });
  const isEdit = Boolean(eventId);

  useEffect(() => {
    if (isEdit && eventId) {
      const fetchEvent = async () => {
        try {
          setFetching(true);
          const event = await eventService.getEventById(eventId);
          let eventDate = "";
          let eventTime = "";
          if (event.eventDate) {
            const d = new Date(event.eventDate);
            eventDate = d.toISOString().split("T")[0];
            eventTime =
              ("0" + d.getHours()).slice(-2) +
              ":" +
              ("0" + d.getMinutes()).slice(-2);
          }
          const et = event.eventType || "SPEED_DATING";
          setEventType(et);
          setFormData({
            title: event.title || "",
            description: event.description || "",
            eventDate: eventDate,
            eventTime: eventTime,
            duration: "3",
            venue: event.venue || "",
            address: event.venue || "",
            city: event.city || "",
            state: event.state || "",
            eventType: et,
            imageUrl: event.imageUrl || "",
            maxParticipants: event.maxParticipants?.toString() || "",
            registrationFee: event.registrationFee?.toString() || "",
          });
        } catch (err) {
          console.error("Error fetching event:", err);
          setError("Failed to load event details");
          // Inline error is shown; no toast to avoid duplicate feedback
        } finally {
          setFetching(false);
        }
      };
      fetchEvent();
    }
  }, [eventId, isEdit]);

  const eventTypes = [
    { value: "SPEED_DATING", icon: "⚡", label: "Speed Dating" },
    { value: "COFFEE_MEETUP", icon: "☕", label: "Coffee Meetup" },
    { value: "DINNER", icon: "🍽️", label: "Dinner Event" },
    { value: "CULTURAL", icon: "🎭", label: "Cultural Evening" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Combine date and time into eventDate (local ISO for backend LocalDateTime, no Z)
    const t = formData.eventTime || "00:00";
    const timePart = t.length <= 5 ? t + ":00" : t;
    const eventDateTime = formData.eventDate
      ? `${formData.eventDate}T${timePart}`
      : null;

    // Validation: event date+time must be at least 24 hours in the future
    if (eventDateTime) {
      const eventDt = new Date(eventDateTime);
      const minDt = new Date();
      minDt.setTime(minDt.getTime() + 24 * 60 * 60 * 1000);
      if (eventDt.getTime() < minDt.getTime()) {
        setError(
          "Event date and time must be at least 24 hours from now. Please choose a later date or time.",
        );
        return;
      }
    }

    const venueOrAddress = formData.venue || formData.address;
    const eventPayload = {
      title: formData.title,
      description: formData.description,
      eventDate: eventDateTime,
      venue: venueOrAddress,
      city: formData.city,
      state: formData.state,
      eventType: formData.eventType || eventType,
      imageUrl: formData.imageUrl?.trim() || null,
      maxParticipants: formData.maxParticipants
        ? parseInt(formData.maxParticipants, 10)
        : null,
      registrationFee: formData.registrationFee
        ? parseFloat(formData.registrationFee, 10)
        : 0,
    };

    try {
      setLoading(true);
      if (isEdit) {
        await eventService.updateEvent(eventId, eventPayload);
        toast.success("Event updated successfully!");
      } else {
        await eventService.createEvent(eventPayload);
        toast.success("Event created successfully!");
      }
      navigate("/dashboard/organizer/my-events");
    } catch (err) {
      console.error("Error saving event:", err);
      const errorMessage = handleApiError(err) || "Failed to save event";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      await eventService.deleteEvent(eventId);
      toast.success("Event deleted successfully!");
      navigate("/dashboard/organizer/my-events");
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <Spinner animation="border" variant="danger" />
            <p className="mt-3 text-muted">Loading event details...</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid>
      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Event"
        message="Delete this event? This action cannot be undone."
        variant="danger"
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <div className="mb-4">
            <h1>{isEdit ? "Edit Event" : "Create New Event"}</h1>
            <p className="text-muted">
              Set up a meetup event for Perfect Match members
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Event Type Selection */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Event Type
                </h5>
                <Row className="g-3">
                  {eventTypes.map((type) => {
                    const isSelected =
                      (formData.eventType || eventType) === type.value;
                    return (
                      <Col key={type.value} xs={6} md={3}>
                        <Card
                          className={`text-center h-100 position-relative ${
                            isSelected
                              ? "border-danger border-3 bg-white shadow"
                              : "border border-2 border-light"
                          }`}
                          style={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => {
                            setEventType(type.value);
                            setFormData((prev) => ({
                              ...prev,
                              eventType: type.value,
                            }));
                          }}
                        >
                          {isSelected && (
                            <span
                              className="position-absolute top-0 end-0 m-2"
                              aria-hidden="true"
                            >
                              <i className="bi bi-check-circle-fill text-danger fs-5" />
                            </span>
                          )}
                          <Card.Body className="py-4">
                            <div
                              style={{ fontSize: "2.5rem" }}
                              className="mb-2"
                            >
                              {type.icon}
                            </div>
                            <div className="fw-semibold">{type.label}</div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Body>
            </Card>

            {/* Basic Details */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Basic Details
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Event Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Speed Dating Evening in Mumbai"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Event Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe what participants can expect..."
                  />
                  <Form.Text className="text-muted">
                    Minimum 100 characters
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Date & Time */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Date & Time
                </h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Event Date <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Start Time <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Duration (hours) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Duration</option>
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Location */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Location
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Address / Venue <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Grand Ballroom, Taj Hotel"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-none">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        City <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        State <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Additional Details */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Additional Details
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Max Participants</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        placeholder="Leave empty for unlimited"
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Registration Fee (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        name="registrationFee"
                        value={formData.registrationFee}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Action Buttons */}
            <div className="d-flex gap-2 justify-content-end pt-3 border-top flex-wrap">
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard/organizer/my-events")}
                disabled={loading}
              >
                Cancel
              </Button>
              {isEdit && (
                <Button
                  variant="danger"
                  className="ms-auto me-2"
                  onClick={handleDeleteClick}
                  disabled={loading}
                >
                  <i className="bi bi-trash me-2"></i>Delete Event
                </Button>
              )}
              <Button variant="danger" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    {isEdit ? "Saving..." : "Publishing..."}
                  </>
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Publish Event"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
