import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../../styles/admin.css";

const OrganizerForm = ({ mode = "add" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit" || id;

  const [formData, setFormData] = useState(() => {
    if (isEdit && id) {
      return {
        firstName: "Rajesh",
        lastName: "Sharma",
        email: "rajesh@mumbaiEvents.com",
        phone: "9876543210",
        companyName: "Mumbai Events Co.",
        address: "123 Business District",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        experience: "6-10",
        specialization: "Speed Dating",
        description:
          "Experienced event organizer specializing in matrimonial events.",
        status: "Active",
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      experience: "",
      specialization: "",
      description: "",
      status: "Active",
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
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert(`Organizer ${isEdit ? "updated" : "added"} successfully!`);
      navigate("/dashboard/admin/manage-organizers");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={() => navigate("/dashboard/admin/manage-organizers")}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <div>
            <h1 className="h3 text-dark mb-2">
              {isEdit ? "Edit" : "Add New"} Event Organizer
            </h1>
            <p className="text-muted mb-0">
              {isEdit ? "Update" : "Create a new"} organizer account
            </p>
          </div>
        </div>
      </div>

      <div className="card mx-auto" style={{ maxWidth: "900px" }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">Company Information</h5>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Company/Organization Name{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                />
                {errors.companyName && (
                  <div className="invalid-feedback">{errors.companyName}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-control"
                />
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="border-bottom pb-2 mb-3">
                Professional Information
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Specialization
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Specialization</option>
                    <option value="Speed Dating">Speed Dating</option>
                    <option value="Cultural Events">Cultural Events</option>
                    <option value="Outdoor Activities">
                      Outdoor Activities
                    </option>
                    <option value="Professional Meetups">
                      Professional Meetups
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Brief description about the organizer and their services..."
                  className="form-control"
                />
              </div>
            </div>

            {isEdit && (
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Account Status</h5>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            )}

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/admin/manage-organizers")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEdit ? "Update" : "Add"} Organizer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerForm;
