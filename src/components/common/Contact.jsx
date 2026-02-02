import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
  Table,
  Modal,
  Nav,
} from "react-bootstrap";
import {
  Envelope,
  Telephone,
  Chat,
  GeoAlt,
  QuestionCircle,
} from "react-bootstrap-icons";
import { toast } from "../../utils/toast.js";

const ContactPage = ({ inLayout = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!phone.match(/^\d{10}$/)) {
      toast.error("Please provide a valid phone number (exactly 10 digits).");
      return;
    }

    if (message.length < 20) {
      toast.error("Please provide a detailed message (minimum 20 characters).");
      return;
    }

    toast.success(
      "Thank you for contacting us! Your message has been sent successfully. We will respond within 24-48 hours.",
    );
    e.target.reset();
  };

  const content = (
    <Container
      className={inLayout ? "my-3" : "my-5"}
      style={inLayout ? { background: "transparent" } : {}}
    >
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Contact Us</h1>
        <p className="lead text-muted">
          We're here to help! Reach out to us for any questions or support.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <h2 className="mb-4">Send us a Message</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Full Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="text" name="name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Email Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control type="email" name="email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Phone Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="10-digit number"
                    pattern="[0-9]{10}"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Subject <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select name="subject" required>
                    <option value="">Select a subject</option>
                    <option value="profile">Profile Related Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="verification">Profile Verification</option>
                    <option value="report">Report a Profile</option>
                    <option value="event">Event Related Query</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    Message <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Please describe your query in detail..."
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="danger"
                  size="lg"
                  className="w-100"
                >
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <h2 className="mb-4">Get in Touch</h2>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="bg-light rounded p-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Envelope className="text-danger" size={26} />
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">
                    <a
                      href="mailto:support@perfectmatch.com"
                      className="text-danger text-decoration-none"
                    >
                      support@perfectmatch.com
                    </a>
                  </p>
                  <p className="mb-0">
                    <a
                      href="mailto:info@perfectmatch.com"
                      className="text-danger text-decoration-none"
                    >
                      info@perfectmatch.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="bg-light rounded p-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Telephone className="text-danger" size={26} />
                </div>
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">
                    <a
                      href="tel:+911234567890"
                      className="text-danger text-decoration-none"
                    >
                      +91 123-456-7890
                    </a>
                  </p>
                  <p className="mb-0">
                    <a
                      href="tel:+911234567891"
                      className="text-danger text-decoration-none"
                    >
                      +91 123-456-7891
                    </a>{" "}
                    (Toll Free)
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="bg-light rounded p-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <Chat className="text-danger" size={26} />
                </div>
                <div>
                  <h5 className="mb-1">WhatsApp</h5>
                  <p className="mb-0">
                    <a
                      href="https://wa.me/911234567890"
                      className="text-danger text-decoration-none"
                    >
                      +91 123-456-7890
                    </a>
                  </p>
                  <p className="mb-0 text-muted">Quick responses available</p>
                </div>
              </div>

              <div className="d-flex gap-3 mb-4">
                <div
                  className="bg-light rounded p-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <GeoAlt className="text-danger" size={26} />
                </div>
                <div>
                  <h5 className="mb-1">Head Office</h5>
                  <p className="mb-0">123, Business Tower</p>
                  <p className="mb-0">Andheri West, Mumbai - 400053</p>
                  <p className="mb-0">Maharashtra, India</p>
                </div>
              </div>

              <Card className="bg-light border-0">
                <Card.Body>
                  <h5 className="mb-3">Office Hours</h5>
                  <p className="mb-2">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </p>
                  <p className="mb-2">
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  </p>
                  <p className="mb-2">
                    <strong>Sunday:</strong> Closed
                  </p>
                  <p className="mb-0 mt-3">
                    <strong>Emergency Support:</strong> 24/7 available via email
                  </p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Quick Help</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="bg-light border-0 border-start border-danger border-4 h-100">
                <Card.Body>
                  <h5 className="mb-2">
                    <QuestionCircle className="me-2 text-danger" />
                    How do I verify my profile?
                  </h5>
                  <p className="mb-0 text-muted">
                    Go to your profile settings and click on "Verify Profile".
                    Upload the required documents for verification.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-light border-0 border-start border-danger border-4 h-100">
                <Card.Body>
                  <h5 className="mb-2">
                    <QuestionCircle className="me-2 text-danger" />
                    How can I upgrade to premium?
                  </h5>
                  <p className="mb-0 text-muted">
                    Click on "Upgrade" in your dashboard and choose a
                    subscription plan that suits your needs.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-light border-0 border-start border-danger border-4 h-100">
                <Card.Body>
                  <h5 className="mb-2">
                    <QuestionCircle className="me-2 text-danger" />
                    Can I hide my profile temporarily?
                  </h5>
                  <p className="mb-0 text-muted">
                    Yes, go to Settings &gt; Privacy and enable "Hide Profile"
                    option. You can unhide anytime.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="bg-light border-0 border-start border-danger border-4 h-100">
                <Card.Body>
                  <h5 className="mb-2">
                    <QuestionCircle className="me-2 text-danger" />
                    How do I report a fake profile?
                  </h5>
                  <p className="mb-0 text-muted">
                    Visit the profile and click on the "Report" button. Provide
                    details and our team will investigate.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );

  if (inLayout) {
    return content;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        width: "100%",
        padding: 0,
        margin: 0,
      }}
    >
      {content}
    </div>
  );
};

ContactPage.propTypes = {
  inLayout: PropTypes.bool,
};

export default ContactPage;
