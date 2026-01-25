import { useNavigate } from "react-router";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";

export const OverallEventsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentOrganizerId = user?.id || 1; // Current organizer ID

  // Mock data - All events from all organizers
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
      organizerId: 1,
      organizerName: "Meera Reddy",
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
      organizerId: 2,
      organizerName: "Rajesh Kumar",
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
      organizerId: 1,
      organizerName: "Meera Reddy",
    },
    {
      id: 4,
      title: "Sunday Brunch Meetup",
      status: "Upcoming",
      location: "Pune, Maharashtra",
      date: "27th October 2025",
      time: "10:00 AM - 1:00 PM",
      participants: "25/40",
      image: "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg",
      organizerId: 3,
      organizerName: "Priya Sharma",
    },
    {
      id: 5,
      title: "Professional Networking",
      status: "Completed",
      location: "Hyderabad, Telangana",
      date: "15th October 2025",
      time: "6:00 PM - 9:00 PM",
      participants: "50/50",
      image:
        "/assets/images/event-images/nathan-dumlao-I_394sxx0ec-unsplash.jpg",
      organizerId: 2,
      organizerName: "Rajesh Kumar",
    },
    {
      id: 6,
      title: "Dinner & Dance",
      status: "Upcoming",
      location: "Chennai, Tamil Nadu",
      date: "2nd November 2025",
      time: "7:00 PM - 11:00 PM",
      participants: "42/60",
      image: "/assets/images/event-images/al-elmes-ULHxWq8reao-unsplash.jpg",
      organizerId: 3,
      organizerName: "Priya Sharma",
    },
  ];

  const getStatusVariant = (status) => {
    const variants = {
      upcoming: "primary",
      ongoing: "success",
      completed: "secondary",
    };
    return variants[status.toLowerCase()] || "secondary";
  };

  return (
    <Container fluid>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h2 className="mb-0">Overall Events</h2>
            <Button
              variant="danger"
              onClick={() => navigate("/dashboard/organizer/create-event")}
            >
              Create New Event
            </Button>
          </div>

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
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "calc(0.375rem - 1px)",
                      borderTopRightRadius: "calc(0.375rem - 1px)",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <div className="mb-2">
                      <Badge
                        bg={getStatusVariant(event.status)}
                        className="me-2"
                      >
                        {event.status}
                      </Badge>
                      <Badge bg="info" className="text-white">
                        👤 {event.organizerName}
                      </Badge>
                    </div>
                    <div className="text-muted small mb-3">
                      <div>📍 {event.location}</div>
                      <div>📅 {event.date}</div>
                      <div>⏰ {event.time}</div>
                      <div>👥 {event.participants} Participants</div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {event.organizerId === currentOrganizerId ? (
                        <>
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
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Cancel this event? All participants will be notified.",
                                )
                              ) {
                                alert("Event cancelled!");
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="w-100"
                          onClick={() =>
                            navigate(
                              `/dashboard/organizer/event-view/${event.id}`,
                            )
                          }
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
