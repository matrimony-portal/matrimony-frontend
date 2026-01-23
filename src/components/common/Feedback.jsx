import React, { useState } from "react";
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
import { Star, StarFill } from "react-bootstrap-icons";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const ratingTexts = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please rate your experience!");
      return;
    }
    alert(
      "Thank you for your feedback!\n\nWe appreciate your input and will use it to improve our services.",
    );
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
      }}
    >
      <Card style={{ maxWidth: "700px", width: "100%" }} className="shadow-lg">
        <Card.Body className="p-4 p-md-5">
          <h1 className="text-center mb-2">💬 We Value Your Feedback</h1>
          <p className="text-center text-muted mb-4">
            Help us improve Perfect Match
          </p>

          <Form onSubmit={handleSubmit}>
            <Card className="bg-light mb-4">
              <Card.Body className="text-center p-4">
                <h5 className="mb-3">Rate Your Experience</h5>
                <div className="fs-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      style={{
                        cursor: "pointer",
                        color:
                          star <= (hoveredRating || rating)
                            ? "#fbbf24"
                            : "#cbd5e0",
                      }}
                    >
                      {star <= (hoveredRating || rating) ? (
                        <StarFill />
                      ) : (
                        <Star />
                      )}
                    </span>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-muted mb-0">{ratingTexts[rating - 1]}</p>
                )}
              </Card.Body>
            </Card>

            <Form.Group className="mb-3">
              <Form.Label>Feedback Category</Form.Label>
              <Form.Select required>
                <option value="">Select Category</option>
                <option>Profile Quality</option>
                <option>Matching Algorithm</option>
                <option>User Interface</option>
                <option>Customer Support</option>
                <option>Events</option>
                <option>Features Request</option>
                <option>General Feedback</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Please share your thoughts, suggestions, or report any issues..."
                required
              />
            </Form.Group>

            <Button type="submit" variant="danger" size="lg" className="w-100">
              Submit Feedback
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FeedbackPage;
