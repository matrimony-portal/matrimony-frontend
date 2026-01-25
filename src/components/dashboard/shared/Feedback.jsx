// src/components/dashboard/shared/Feedback.jsx
import { useState, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * StarRating - Reusable star rating component
 */
const StarRating = ({ rating, onRate, ratingTexts }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="bg-light rounded p-4 text-center mb-4">
      <h5 className="mb-3">Rate Your Experience</h5>
      <div className="d-flex justify-content-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`fs-1 ${
              star <= (hoveredRating || rating) ? "text-warning" : "text-muted"
            }`}
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => onRate(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onKeyDown={(e) => e.key === "Enter" && onRate(star)}
            role="button"
            tabIndex={0}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-muted mb-0">{ratingTexts[rating - 1]}</p>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRate: PropTypes.func.isRequired,
  ratingTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/**
 * Feedback category options
 */
const FEEDBACK_CATEGORIES = [
  { value: "", label: "Select Category" },
  { value: "profile", label: "Profile Quality" },
  { value: "matching", label: "Matching Algorithm" },
  { value: "ui", label: "User Interface" },
  { value: "support", label: "Customer Support" },
  { value: "events", label: "Events" },
  { value: "feature", label: "Features Request" },
  { value: "general", label: "General Feedback" },
];

/**
 * Shared Feedback component used across public pages and dashboard.
 * Supports both standalone and in-layout modes.
 */
const Feedback = ({ inLayout = true, onSubmit = null }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingTexts = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleRating = useCallback((rating) => {
    setSelectedRating(rating);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (selectedRating === 0) {
        // TODO: Replace with toast notification
        alert("Please rate your experience!");
        return;
      }

      setIsSubmitting(true);
      try {
        if (onSubmit) {
          await onSubmit({
            rating: selectedRating,
            ...formData,
          });
        } else {
          // Default behavior - show alert
          alert(
            "Thank you for your feedback!\n\nWe appreciate your input and will use it to improve our services.",
          );
        }

        // Reset form
        setSelectedRating(0);
        setFormData({ category: "", feedback: "" });
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedRating, formData, onSubmit],
  );

  const content = (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card">
          <div className="card-body p-4 p-md-5">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="h3 mb-2">💬 We Value Your Feedback</h1>
              <p className="text-muted">Help us improve Perfect Match</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Rating Section */}
              <StarRating
                rating={selectedRating}
                onRate={handleRating}
                ratingTexts={ratingTexts}
              />

              {/* Feedback Category */}
              <div className="mb-4">
                <label className="form-label" htmlFor="feedback-category">
                  Feedback Category
                </label>
                <select
                  className="form-select"
                  id="feedback-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {FEEDBACK_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Feedback Text */}
              <div className="mb-4">
                <label className="form-label" htmlFor="feedback-text">
                  Your Feedback
                </label>
                <textarea
                  className="form-control"
                  id="feedback-text"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Please share your thoughts, suggestions, or report any issues..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-danger w-100 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </form>

            {/* Additional Info */}
            <div className="alert alert-info mt-4 mb-0">
              <i className="bi bi-info-circle-fill me-2"></i>
              <small>
                Your feedback helps us improve our services. We review all
                feedback and implement valuable suggestions to enhance your
                experience.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (inLayout) {
    return <div className="container-fluid py-3 py-md-4">{content}</div>;
  }

  // Public page styling
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
      }}
    >
      <div style={{ maxWidth: "700px", width: "100%" }}>{content}</div>
    </div>
  );
};

Feedback.propTypes = {
  inLayout: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default Feedback;
