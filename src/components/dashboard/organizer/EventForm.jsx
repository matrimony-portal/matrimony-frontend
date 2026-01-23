import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export const EventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventType, setEventType] = useState("speed-dating");
  const isEdit = Boolean(eventId);

  const eventTypes = [
    { value: "speed-dating", icon: "⚡", label: "Speed Dating" },
    { value: "coffee-meetup", icon: "☕", label: "Coffee Meetup" },
    { value: "dinner", icon: "🍽️", label: "Dinner Event" },
    { value: "cultural", icon: "🎭", label: "Cultural Evening" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = isEdit
      ? "Save changes to this event?"
      : "Publish this event? It will be visible to all Perfect Match members.";

    if (window.confirm(message)) {
      alert(
        isEdit ? "Event updated successfully!" : "Event created successfully!",
      );
      navigate("/dashboard/organizer/my-events");
    }
  };

  return (
    <Container fluid>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="mb-4">
            <h1>{isEdit ? "Edit Event" : "Create New Event"}</h1>
            <p className="text-muted">
              Set up a meetup event for Perfect Match members
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Event Type Selection */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Event Type
                </h5>
                <Row className="g-3">
                  {eventTypes.map((type) => (
                    <Col key={type.value} xs={6} md={3}>
                      <Card
                        className={`text-center h-100 ${eventType === type.value ? "border-danger bg-white" : ""}`}
                        style={{ cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => setEventType(type.value)}
                      >
                        <Card.Body className="py-4">
                          <div style={{ fontSize: "2.5rem" }} className="mb-2">
                            {type.icon}
                          </div>
                          <div className="fw-semibold">{type.label}</div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
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
                    required
                    placeholder="e.g., Speed Dating Evening in Mumbai"
                    defaultValue={isEdit ? "Speed Dating Evening" : ""}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Event Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    required
                    placeholder="Describe what participants can expect..."
                    defaultValue={
                      isEdit
                        ? "An exciting speed dating event where singles can meet potential matches in a fun, relaxed environment."
                        : ""
                    }
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
                        required
                        defaultValue={isEdit ? "2025-10-25" : ""}
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
                        required
                        defaultValue={isEdit ? "18:00" : ""}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Duration (hours) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select required defaultValue={isEdit ? "3" : ""}>
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
                    Venue Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="e.g., The Coffee House"
                    defaultValue={isEdit ? "The Lounge, Bandra" : ""}
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
                        required
                        defaultValue={isEdit ? "Mumbai" : ""}
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
                        required
                        defaultValue={isEdit ? "Maharashtra" : ""}
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
              >
                Cancel
              </Button>
              {isEdit && (
                <Button
                  variant="danger"
                  className="ms-auto me-2"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this event? This action cannot be undone.",
                      )
                    ) {
                      alert("Event deleted!");
                      navigate("/dashboard/organizer/my-events");
                    }
                  }}
                >
                  <i className="bi bi-trash me-2"></i>Delete Event
                </Button>
              )}
              <Button variant="danger" type="submit">
                {isEdit ? "Save Changes" : "Publish Event"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
