// OrganizerSettings.jsx
import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme.jsx";

export const OrganizerSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportForm, setReportForm] = useState({
    profileId: "",
    reason: "",
    details: "",
  });

  const blockedUsers = [
    { id: 1, name: "Sanjay Kumar", initials: "SK", date: "Oct 15, 2025" },
    { id: 2, name: "Ajay Mehta", initials: "AM", date: "Oct 10, 2025" },
    { id: 3, name: "Rohan Verma", initials: "RV", date: "Oct 5, 2025" },
  ];

  const handleUnblock = (name) => {
    if (
      window.confirm(
        `Unblock ${name}? They will be able to view your profile and contact you again.`,
      )
    ) {
      alert(`${name} has been unblocked successfully.`);
    }
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportForm.profileId || !reportForm.reason) {
      alert("Please fill in all required fields.");
      return;
    }
    if (
      window.confirm(
        "Submit this report? Our team will review it and take appropriate action.",
      )
    ) {
      alert("Thank you for reporting. Our team will review this profile.");
      setReportForm({ profileId: "", reason: "", details: "" });
      setShowReportForm(false);
    }
  };

  const handleToggleReportForm = () => {
    setShowReportForm(!showReportForm);
    if (showReportForm) {
      // If closing, clear the form
      setReportForm({ profileId: "", reason: "", details: "" });
    }
  };

  return (
    <Container fluid>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
            Privacy Settings
          </h5>
          <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center mb-3">
            <div>
              <h6 className="mb-1">Profile Visibility</h6>
              <p className="text-muted mb-0 small">
                Control who can see your profile
              </p>
            </div>
            <Form.Select style={{ width: "auto" }}>
              <option>Everyone</option>
              <option>Premium Members Only</option>
              <option>Hidden</option>
            </Form.Select>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
            Notification Settings
          </h5>
          <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Email Notifications</h6>
              <p className="text-muted mb-0 small">Receive updates via email</p>
            </div>
            <Form.Check type="switch" defaultChecked />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
            Appearance
          </h5>
          <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Theme</h6>
              <p className="text-muted mb-0 small">
                Choose your preferred color theme
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant={theme === "default" ? "danger" : "outline-secondary"}
                size="sm"
                onClick={() => toggleTheme("default")}
                style={{ minWidth: "100px" }}
              >
                <i className="bi bi-sun me-2"></i>
                Default
              </Button>
              <Button
                variant={theme === "dark" ? "danger" : "outline-secondary"}
                size="sm"
                onClick={() => toggleTheme("dark")}
                style={{ minWidth: "100px" }}
              >
                <i className="bi bi-moon me-2"></i>
                Dark
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3 pb-2 border-bottom border-danger border-2">
            Blocked Users
          </h5>
          <p className="text-muted mb-4">
            These users cannot view your profile or contact you
          </p>

          {blockedUsers.length === 0 ? (
            <div className="text-center text-muted py-4">
              <p className="mb-0">No blocked users</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-light p-3 rounded d-flex justify-content-between align-items-center flex-wrap gap-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{
                        width: "50px",
                        height: "50px",
                        background:
                          "linear-gradient(135deg, #5a0d14 0%, #ae1700 100%)",
                      }}
                    >
                      {user.initials}
                    </div>
                    <div>
                      <h6 className="mb-0">{user.name}</h6>
                      <small className="text-muted">
                        Blocked on: {user.date}
                      </small>
                    </div>
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleUnblock(user.name)}
                  >
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-5">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-1">Report Profile</h5>
              <p className="text-muted mb-0 small">
                Report suspicious or inappropriate user profiles
              </p>
            </div>
            <Button
              variant={showReportForm ? "outline-danger" : "danger"}
              onClick={handleToggleReportForm}
            >
              {showReportForm ? (
                <>
                  <i className="bi bi-x-circle me-2"></i>Close
                </>
              ) : (
                <>
                  <i className="bi bi-flag me-2"></i>Report Profile
                </>
              )}
            </Button>
          </div>

          {showReportForm && (
            <div
              className="mt-4 pt-3 border-top"
              style={{
                animation: "fadeIn 0.3s ease-in",
              }}
            >
              <Form onSubmit={handleReportSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Profile ID or Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="profileId"
                    value={reportForm.profileId}
                    onChange={handleReportChange}
                    placeholder="Enter profile ID or email address"
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter the profile ID or email of the user you want to report
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Reason for Reporting <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    name="reason"
                    value={reportForm.reason}
                    onChange={handleReportChange}
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="fake-profile">Fake Profile</option>
                    <option value="inappropriate-content">
                      Inappropriate Content
                    </option>
                    <option value="harassment">Harassment or Abuse</option>
                    <option value="spam">Spam or Scam</option>
                    <option value="misleading-info">
                      Misleading Information
                    </option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="details"
                    value={reportForm.details}
                    onChange={handleReportChange}
                    placeholder="Provide any additional information that might help our team review this report..."
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="danger" type="submit">
                    Submit Report
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() =>
                      setReportForm({ profileId: "", reason: "", details: "" })
                    }
                  >
                    Clear
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Card.Body>
      </Card>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
};

// BlockedUsers.jsx
