import { useNavigate, useParams } from "react-router";
import { Container, Card, Button, Badge, Form } from "react-bootstrap";
import { useState } from "react";

export const EventDetails = ({ mode }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const isEdit = mode === "edit";

  const events = [
    {
      id: 1,
      title: "Speed Dating Evening",
      status: "Upcoming",
      location: "Mumbai, Maharashtra",
      date: "25th October 2025",
      time: "6:00 PM - 9:00 PM",
      participants: "45/50",
      image: "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg",
    },
    {
      id: 2,
      title: "Coffee Meetup",
      status: "Ongoing",
      location: "Bangalore, Karnataka",
      date: "21st October 2025",
      time: "11:00 AM - 2:00 PM",
      participants: "30/30",
      image:
        "/assets/images/event-images/nathan-dumlao-I_394sxx0ec-unsplash.jpg",
    },
    {
      id: 3,
      title: "Cultural Evening",
      status: "Upcoming",
      location: "Delhi, India",
      date: "30th October 2025",
      time: "7:00 PM - 10:00 PM",
      participants: "38/60",
      image: "/assets/images/event-images/al-elmes-ULHxWq8reao-unsplash.jpg",
    },
  ];

  const event = events.find((e) => e.id === Number(eventId));

  const [formData, setFormData] = useState(event);

  if (!event) return <h3>Event not found</h3>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Event updated (dummy)");
    navigate(`/dashboard/organizer/event-view/${eventId}`);
  };

  return (
    <Container fluid>
      {/* BACK */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div
            onClick={() => navigate("/dashboard/organizer/events")}
            style={{ cursor: "pointer", color: "#ae1700", fontWeight: 600 }}
          >
            ← Back to My Events
          </div>

          <div className="d-flex align-items-center gap-3 mt-2">
            <h1 className="mb-0">{isEdit ? "Edit Event" : formData.title}</h1>
            <Badge bg="primary">{formData.status}</Badge>
          </div>
        </Card.Body>
      </Card>

      {/* IMAGE */}
      <div
        className="rounded mb-4 shadow-sm"
        style={{
          height: "300px",
          backgroundImage: `url("${formData.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* DETAILS */}
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4">Event Details</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                name="location"
                value={formData.location}
                onChange={handleChange}
                readOnly={!isEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                value={formData.date}
                onChange={handleChange}
                readOnly={!isEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                name="time"
                value={formData.time}
                onChange={handleChange}
                readOnly={!isEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Participants</Form.Label>
              <Form.Control value={formData.participants} readOnly />
            </Form.Group>

            {/* ACTIONS */}
            <div className="d-flex gap-2 mt-4">
              {!isEdit && (
                <Button
                  variant="danger"
                  onClick={() =>
                    navigate(`/dashboard/organizer/event-edit/${eventId}`)
                  }
                >
                  ✏️ Edit Event
                </Button>
              )}

              {isEdit && (
                <>
                  <Button variant="success" onClick={handleSave}>
                    💾 Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(`/dashboard/organizer/event-view/${eventId}`)
                    }
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
