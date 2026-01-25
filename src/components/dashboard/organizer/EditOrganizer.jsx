import { useState } from "react";
import { useNavigate } from "react-router";
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

export const EditOrganizerProfile = () => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(
    "/assets/images/event-organizer/profile-pic.jpg",
  );

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Save all changes to your profile?")) {
      alert("Profile updated successfully!");
      navigate("/dashboard/organizer/profile");
    }
  };

  return (
    <Container fluid>
      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="mb-4">Edit Profile</h1>

          <Form onSubmit={handleSubmit}>
            {/* Profile Photo Section */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3} className="text-center">
                    <Image
                      src={photoPreview}
                      roundedCircle
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      className="mb-3"
                    />
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="d-none"
                      id="photoUpload"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        document.getElementById("photoUpload").click()
                      }
                    >
                      Change Photo
                    </Button>
                  </Col>
                  <Col md={9}>
                    <h4>Profile Completion: 75%</h4>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                    <small className="text-muted">
                      Add more details to get better visibility!
                    </small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Basic Information */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Basic Information
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        First Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" defaultValue="Rahul" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Last Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Agarwal"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Date of Birth <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue="1994-05-15"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Gender <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select defaultValue="male" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Professional Information */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Professional Information
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Organization <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Cupid Knot"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Designation <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Event Manager"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Years of Experience</Form.Label>
                      <Form.Control type="number" defaultValue="8" min="0" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="BBA from ISB Hyderabad"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Contact Information */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  Contact Information
                </h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue="rahul.agarwal@email.com"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Phone <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        defaultValue="+91 98765-98765"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        City <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" defaultValue="Pune" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        State <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Maharashtra"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* About Me */}
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
                  About Me
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Tell members about yourself and your experience..."
                    defaultValue="I'm a 31-year-old Event Manager based in Pune, working with a leading event managing firm, Cupid Knot."
                  />
                  <Form.Text className="text-muted">
                    Minimum 50 characters
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Action Buttons */}
            <div className="d-flex gap-2 justify-content-end pt-3 border-top">
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard/organizer/profile")}
              >
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
