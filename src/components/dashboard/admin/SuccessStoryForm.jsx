import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const SuccessStoryForm = ({ mode = "add" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit" || id;

  const [formData, setFormData] = useState(() => {
    if (isEdit && id) {
      return {
        title: "Rahul & Priya - A Perfect Match",
        groomName: "Rahul Kumar",
        brideName: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        marriageDate: "2024-01-15",
        story:
          "We found each other on Perfect Match and it's been an incredible journey.",
        metThrough: "Online Platform",
        timeToMatch: "2 months",
        status: "Published",
      };
    }
    return {
      title: "",
      groomName: "",
      brideName: "",
      location: "",
      marriageDate: "",
      story: "",
      metThrough: "",
      timeToMatch: "",
      status: "Draft",
    };
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.groomName.trim())
      newErrors.groomName = "Groom name is required";
    if (!formData.brideName.trim())
      newErrors.brideName = "Bride name is required";
    if (!formData.story.trim()) newErrors.story = "Story is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert(`Success story ${isEdit ? "updated" : "added"} successfully!`);
      navigate("/dashboard/admin/manage-success-stories");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="page-header mb-4">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={() => navigate("/dashboard/admin/manage-success-stories")}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <div>
            <h1>{isEdit ? "Edit" : "Add"} Success Story</h1>
            <p className="mb-0">
              {isEdit ? "Update" : "Create a new"} success story
            </p>
          </div>
        </div>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Story Details</h3>
            <div className="form-group">
              <label>
                Story Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., A Perfect Match Made in Heaven"
                className={errors.title ? "error" : ""}
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Groom Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="groomName"
                  value={formData.groomName}
                  onChange={handleInputChange}
                  className={errors.groomName ? "error" : ""}
                />
                {errors.groomName && (
                  <div className="error-message">{errors.groomName}</div>
                )}
              </div>
              <div className="form-group">
                <label>
                  Bride Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="brideName"
                  value={formData.brideName}
                  onChange={handleInputChange}
                  className={errors.brideName ? "error" : ""}
                />
                {errors.brideName && (
                  <div className="error-message">{errors.brideName}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              <div className="form-group">
                <label>Marriage Date</label>
                <input
                  type="date"
                  name="marriageDate"
                  value={formData.marriageDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Story Content</h3>
            <div className="form-group">
              <label>
                Success Story <span className="required">*</span>
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows="6"
                placeholder="Tell their beautiful love story..."
                className={errors.story ? "error" : ""}
              />
              {errors.story && (
                <div className="error-message">{errors.story}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>How They Met</label>
                <select
                  name="metThrough"
                  value={formData.metThrough}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Online Platform">Online Platform</option>
                  <option value="Speed Dating Event">Speed Dating Event</option>
                  <option value="Cultural Evening">Cultural Evening</option>
                  <option value="Professional Meetup">
                    Professional Meetup
                  </option>
                  <option value="Family Introduction">
                    Family Introduction
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>Time to Match</label>
                <select
                  name="timeToMatch"
                  value={formData.timeToMatch}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Publication Settings</h3>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Pending Review">Pending Review</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                navigate("/dashboard/admin/manage-success-stories")
              }
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? "Update Story" : "Add Success Story"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .page-header {
          background: white;
          padding: 1.5rem 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .page-header h1 {
          color: #333;
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        .form-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          max-width: 900px;
          margin: 0 auto;
        }
        .form-section {
          margin-bottom: 2rem;
        }
        .form-section h3 {
          color: #333;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .required {
          color: #ef4444;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: #ef4444;
        }
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ae1700;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: flex-end;
        }
        .btn {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary {
          background: #ae1700;
          color: white;
        }
        .btn-primary:hover {
          background: #8b1200;
        }
        .btn-secondary {
          background: #e2e8f0;
          color: #333;
        }
        .btn-secondary:hover {
          background: #cbd5e0;
        }
        .btn-outline-secondary {
          background: transparent;
          color: #666;
          border: 1px solid #ddd;
        }
        .btn-outline-secondary:hover {
          background: #f8f9fa;
        }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
          .form-actions {
            flex-direction: column;
          }
          .page-header .d-flex {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessStoryForm;
