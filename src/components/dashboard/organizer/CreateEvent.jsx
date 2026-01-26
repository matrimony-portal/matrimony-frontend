import { useState } from "react";
import { useNavigate } from "react-router";
import { eventService } from "../../../services/eventService.js";
import { toast } from "react-toastify";
import Input from "../../ui/Input.jsx";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    city: "",
    state: "",
    maxParticipants: "",
    registrationFee: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Event description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      const selectedDate = new Date(
        `${formData.eventDate}T${formData.eventTime || "00:00"}`,
      );
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.eventDate = "Event date must be in the future";
      }
    }

    if (!formData.eventTime) {
      newErrors.eventTime = "Event time is required";
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (formData.maxParticipants) {
      const maxParticipants = parseInt(formData.maxParticipants, 10);
      if (isNaN(maxParticipants) || maxParticipants < 1) {
        newErrors.maxParticipants =
          "Max participants must be a positive number";
      }
    }

    if (formData.registrationFee) {
      const fee = parseFloat(formData.registrationFee);
      if (isNaN(fee) || fee < 0) {
        newErrors.registrationFee =
          "Registration fee must be a non-negative number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      // Combine date and time into ISO string
      const eventDateTime = new Date(
        `${formData.eventDate}T${formData.eventTime}`,
      ).toISOString();

      const eventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        eventDate: eventDateTime,
        venue: formData.venue.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        maxParticipants: formData.maxParticipants
          ? parseInt(formData.maxParticipants, 10)
          : null,
        registrationFee: formData.registrationFee
          ? parseFloat(formData.registrationFee)
          : 0,
      };

      await eventService.createEvent(eventData);

      toast.success("Event created successfully!");
      navigate("/dashboard/organizer/events");
    } catch (error) {
      console.error("Error creating event:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create event";
      toast.error(errorMessage);

      // Set field-specific errors if available
      if (error.response?.data?.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Create New Event</h2>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/dashboard/organizer/events")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Events
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input
                      type="text"
                      name="title"
                      label="Event Title"
                      placeholder="e.g., Matrimony Meetup 2024"
                      value={formData.title}
                      onChange={handleInputChange}
                      error={errors.title}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <Input
                      type="text"
                      name="venue"
                      label="Venue"
                      placeholder="e.g., Grand Ballroom, Taj Hotel"
                      value={formData.venue}
                      onChange={handleInputChange}
                      error={errors.venue}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    rows="4"
                    placeholder="Describe your event in detail..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <Input
                      type="date"
                      name="eventDate"
                      label="Event Date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      error={errors.eventDate}
                      min={today}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      type="time"
                      name="eventTime"
                      label="Event Time"
                      value={formData.eventTime}
                      onChange={handleInputChange}
                      error={errors.eventTime}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      type="number"
                      name="maxParticipants"
                      label="Max Participants"
                      placeholder="e.g., 200"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      error={errors.maxParticipants}
                      min="1"
                    />
                    <small className="form-text text-muted">
                      Leave empty for unlimited participants
                    </small>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <Input
                      type="text"
                      name="city"
                      label="City"
                      placeholder="e.g., Mumbai"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      type="text"
                      name="state"
                      label="State"
                      placeholder="e.g., Maharashtra"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <Input
                      type="number"
                      name="registrationFee"
                      label="Registration Fee (₹)"
                      placeholder="e.g., 500"
                      value={formData.registrationFee}
                      onChange={handleInputChange}
                      error={errors.registrationFee}
                      min="0"
                      step="0.01"
                    />
                    <small className="form-text text-muted">
                      Leave empty or 0 for free events
                    </small>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/dashboard/organizer/events")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Event
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
