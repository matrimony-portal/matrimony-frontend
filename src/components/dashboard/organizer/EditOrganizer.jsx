import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { organizerService } from "../../../services/organizerService.js";
import { toast } from "../../../utils/toast.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";
import { organizerProfileSchema } from "../../../schemas/organizerProfileSchema.js";

export const EditOrganizerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(
    "/assets/images/event-organizer/profile-pic.jpg",
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    aboutMe: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const profile = await organizerService.getProfile(user.id);
        setFormData({
          firstName: profile.firstName ?? "",
          lastName: profile.lastName ?? "",
          phone: profile.phone ?? "",
          city: profile.city ?? "",
          state: profile.state ?? "",
          aboutMe: profile.aboutMe ?? "",
        });
      } catch (e) {
        console.error("Error fetching organizer profile:", e);
        setError("Failed to load profile.");
        // Inline error is shown; no toast to avoid duplicate feedback
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name])
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phone: formData.phone?.trim() || "",
      city: formData.city?.trim() || "",
      state: formData.state?.trim() || "",
      aboutMe: formData.aboutMe?.trim() || "",
    };
    const result = organizerProfileSchema.safeParse(payload);
    if (!result.success) {
      const err = {};
      result.error.errors.forEach((e) => {
        const p = e.path[0];
        if (p) err[p] = e.message;
      });
      setValidationErrors(err);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirm(false);
    if (!user?.id) return;
    try {
      setSaving(true);
      await organizerService.updateProfile(user.id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || null,
        city: formData.city.trim() || null,
        state: formData.state.trim() || null,
        aboutMe: formData.aboutMe.trim() || null,
      });
      toast.success("Profile updated successfully!");
      navigate("/dashboard/organizer/my-profile");
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Failed to update profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  return (
    <Container fluid>
      <ConfirmationModal
        show={showConfirm}
        title="Save Changes"
        message="Save all changes to your profile?"
        variant="primary"
        confirmText="Save"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirm(false)}
      />

      <Card className="shadow-sm">
        <Card.Body>
          <h1 className="mb-4">Edit Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Profile Photo */}
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
                    <p className="text-muted mb-0">
                      Photo upload is not yet saved to profile. Other fields
                      below are updated via API.
                    </p>
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
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Last Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.lastName}
                      </Form.Control.Feedback>
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
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        isInvalid={!!validationErrors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Pune"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Maharashtra"
                        isInvalid={!!validationErrors.state}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.state}
                      </Form.Control.Feedback>
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
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                    placeholder="Tell members about yourself and your experience..."
                    isInvalid={!!validationErrors.aboutMe}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.aboutMe}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-flex gap-2 justify-content-end pt-3 border-top">
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard/organizer/my-profile")}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button variant="danger" type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
