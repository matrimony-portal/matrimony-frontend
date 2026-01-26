// src/components/dashboard/premium/Feedback.jsx
import React, { useState } from "react";

const Feedback = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    feedback: "",
  });

  const ratingTexts = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleRating = (rating) => {
    setSelectedRating(rating);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRating === 0) {
      alert("Please rate your experience!");
      return;
    }
    alert(
      "Thank you for your feedback!\n\nWe appreciate your input and will use it to improve our services.",
    );
    setSelectedRating(0);
    setFormData({ category: "", feedback: "" });
  };

  return (
    <div className="container-fluid py-3 py-md-4">
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
                <div className="bg-light rounded p-4 text-center mb-4">
                  <h5 className="mb-3">Rate Your Experience</h5>
                  <div className="d-flex justify-content-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`fs-1 ${selectedRating >= star ? "text-warning" : "text-muted"}`}
                        style={{ cursor: "pointer", userSelect: "none" }}
                        onClick={() => handleRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {selectedRating > 0 && (
                    <p className="text-muted mb-0">
                      {ratingTexts[selectedRating - 1]}
                    </p>
                  )}
                </div>

                {/* Feedback Category */}
                <div className="mb-4">
                  <label className="form-label">Feedback Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="profile">Profile Quality</option>
                    <option value="matching">Matching Algorithm</option>
                    <option value="ui">User Interface</option>
                    <option value="support">Customer Support</option>
                    <option value="events">Events</option>
                    <option value="feature">Features Request</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                {/* Feedback Text */}
                <div className="mb-4">
                  <label className="form-label">Your Feedback</label>
                  <textarea
                    className="form-control"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Please share your thoughts, suggestions, or report any issues..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-danger w-100 py-3">
                  Submit Feedback
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
    </div>
  );
};

export default Feedback;
