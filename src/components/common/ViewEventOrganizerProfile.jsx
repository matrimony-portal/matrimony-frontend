import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Image,
} from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

// ============ View Event Organizer Profile (Public) ============
export const ViewEventOrganizerProfile = () => {
  const navigate = useNavigate();
  const { organizerId } = useParams();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Mock data - replace with API call using organizerId
  const organizer = {
    id: organizerId || 1,
    name: "Meera Reddy",
    company: "Mumbai Events Co.",
    email: "meera@mumbaiEvents.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    experience: "6-10 years",
    specialization: "Speed Dating",
    description:
      "Experienced event organizer specializing in matrimonial events and speed dating sessions. We have successfully organized over 50 events with high satisfaction rates.",
    stats: {
      eventsCount: 15,
      rating: 4.8,
      totalParticipants: 450,
      successfulMatches: 23,
    },
    recentEvents: [
      {
        id: 1,
        title: "Speed Dating Mumbai",
        date: "2024-01-20",
        participants: 30,
        status: "Completed",
      },
      {
        id: 2,
        title: "Cultural Evening",
        date: "2024-01-15",
        participants: 25,
        status: "Completed",
      },
      {
        id: 3,
        title: "Professional Meetup",
        date: "2024-02-05",
        participants: 40,
        status: "Upcoming",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Priya S.",
        rating: 5,
        comment: "Excellent organization and great atmosphere!",
        date: "2024-01-21",
      },
      {
        id: 2,
        user: "Rahul K.",
        rating: 4,
        comment: "Well managed event, met some interesting people.",
        date: "2024-01-16",
      },
    ],
  };

  const images = [
    "coffee.jpg",
    "dinner-dance-2.jpg",
    "dinner-dance.jpg",
    "dinner.jpg",
    "music-night-2.jpg",
    "music-night.jpg",
    "picnic-2.jpg",
    "picnic.jpg",
    "speed-dating.jpg",
  ];

  const openLightbox = (index) => {
    setCurrentImage(index);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Container fluid className="py-3 py-md-4">
      {/* Back Button */}
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="text-decoration-none d-flex align-items-center gap-2 mb-3"
        style={{ color: "#ae1700", padding: 0 }}
      >
        <ArrowLeft size={20} />
        <span>Back to Events</span>
      </Button>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <Image
                src="/assets/images/event-organizer/profile-pic.jpg"
                alt={organizer.name}
                rounded
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
                className="mb-3"
              />
              <Badge bg="success" className="mb-2">
                ✅ Verified Organizer
              </Badge>
            </Col>
            <Col md={9}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <h1 className="mb-0">{organizer.name}</h1>
                <i className="bi bi-patch-check-fill text-primary fs-4"></i>
              </div>
              <p className="text-muted mb-2">{organizer.company}</p>

              <Row className="g-3 mb-3">
                <Col md={6}>
                  <span>
                    📍 <strong>{organizer.location}</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    ⭐ <strong>Rating: {organizer.stats.rating}/5.0</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    📅 <strong>Experience: {organizer.experience}</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    🎯{" "}
                    <strong>Specialization: {organizer.specialization}</strong>
                  </span>
                </Col>
              </Row>

              <div className="d-flex gap-3 flex-wrap">
                <div className="text-center">
                  <div className="h4 text-danger mb-0">
                    {organizer.stats.eventsCount}
                  </div>
                  <div className="small text-muted">Events Organized</div>
                </div>
                <div className="text-center">
                  <div className="h4 text-danger mb-0">
                    {organizer.stats.totalParticipants}
                  </div>
                  <div className="small text-muted">Total Participants</div>
                </div>
                <div className="text-center">
                  <div className="h4 text-danger mb-0">
                    {organizer.stats.successfulMatches}
                  </div>
                  <div className="small text-muted">Successful Matches</div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                About
              </h3>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                {organizer.description}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                Recent Events
              </h3>
              <div className="list-group">
                {organizer.recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h6 className="mb-1">{event.title}</h6>
                      <small className="text-muted">
                        {event.date} • {event.participants} participants
                      </small>
                    </div>
                    <Badge
                      bg={
                        event.status === "Completed"
                          ? "secondary"
                          : event.status === "Upcoming"
                            ? "primary"
                            : "success"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                Reviews
              </h3>
              {organizer.reviews.map((review) => (
                <div key={review.id} className="mb-3 pb-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{review.user}</strong>
                      <div className="small text-muted">{review.date}</div>
                    </div>
                    <div>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating ? "text-warning" : "text-muted"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                Photo Gallery
              </h3>
              <Row className="g-2">
                {images.map((img, idx) => (
                  <Col xs={4} md={3} key={idx}>
                    <Image
                      src={`/assets/images/event-organizer/${img}`}
                      alt={`Photo ${idx + 1}`}
                      rounded
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => openLightbox(idx)}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-3">Contact Information</h4>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                <span style={{ fontSize: "1.5rem" }}>📞</span>
                <div>
                  <div className="small text-muted">Phone</div>
                  <div className="fw-semibold">{organizer.phone}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                <span style={{ fontSize: "1.5rem" }}>📧</span>
                <div>
                  <div className="small text-muted">Email</div>
                  <div className="fw-semibold">{organizer.email}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lightbox Modal */}
      <Modal
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
        size="xl"
        centered
      >
        <Modal.Body className="bg-dark text-center p-0">
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-3"
            onClick={() => setShowLightbox(false)}
            style={{ zIndex: 1 }}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
          <Image
            src={`/assets/images/event-organizer/${images[currentImage]}`}
            style={{ maxHeight: "90vh", maxWidth: "100%" }}
          />
          <div className="d-flex justify-content-between p-3">
            <Button variant="light" onClick={prevImage}>
              ‹ Previous
            </Button>
            <Button variant="light" onClick={nextImage}>
              Next ›
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
