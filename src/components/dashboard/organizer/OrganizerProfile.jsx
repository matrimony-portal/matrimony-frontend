import { useState } from "react";
//import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
  Image,
} from "react-bootstrap";

// ============ View Organizer Profile ============
export const OrganizerProfile = () => {
  //const navigate = useNavigate();
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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
    <Container fluid>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <Image
                src="/assets/images/event-organizer/profile-pic.jpg"
                alt="Rahul Agarwal"
                rounded
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
                className="mb-3"
              />
            </Col>
            <Col md={9}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <h1 className="mb-0">Rahul Agarwal</h1>
                <i className="bi bi-patch-check-fill text-primary fs-4"></i>
              </div>
              <p className="text-muted mb-3">ID: PM768942</p>

              <Row className="g-3">
                <Col md={6}>
                  <span>
                    📅 <strong>31 years</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    🕉️ <strong>Hindu, Baniya</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    📍 <strong>Pune, Maharashtra</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    🎓 <strong>BBA</strong>
                  </span>
                </Col>
                <Col md={6}>
                  <span>
                    💼 <strong>Event Organizer</strong>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3 pb-2 border-bottom border-danger border-2">
                About Me
              </h3>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                I'm a 31-year-old Event Manager based in Pune, working with a
                leading event managing firm, Cupid Knot. I did my BBA from ISB
                Hyderabad. I enjoy reading about startups, exploring new
                cuisines, and keeping fit through running and yoga. Family and
                work-life balance matter a lot to me.
              </p>
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
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Contact Information</h4>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                <span style={{ fontSize: "1.5rem" }}>📞</span>
                <div>
                  <div className="small text-muted">Phone</div>
                  <div className="fw-semibold">+91 98765-98765</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-2">
                <span style={{ fontSize: "1.5rem" }}>📧</span>
                <div>
                  <div className="small text-muted">Email</div>
                  <div className="fw-semibold">rahul.agarwal@email.com</div>
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
