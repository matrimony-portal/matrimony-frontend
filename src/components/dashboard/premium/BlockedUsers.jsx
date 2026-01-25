// src/components/dashboard/premium/BlockedUsers.jsx
import { useState } from "react";

const BlockedUsers = () => {
  const [activeTab, setActiveTab] = useState("blocked");
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 1,
      name: "Sanjay Kumar",
      initials: "SK",
      blockedDate: "Oct 15, 2025",
    },
    {
      id: 2,
      name: "Ajay Mehta",
      initials: "AM",
      blockedDate: "Oct 10, 2025",
    },
    {
      id: 3,
      name: "Rohan Verma",
      initials: "RV",
      blockedDate: "Oct 5, 2025",
    },
  ]);

  const [reportForm, setReportForm] = useState({
    profileId: "",
    reason: "",
    details: "",
  });

  const unblockUser = (id, name) => {
    if (
      window.confirm(
        `Unblock ${name}?\n\nThey will be able to view your profile and contact you again.`,
      )
    ) {
      setBlockedUsers(blockedUsers.filter((user) => user.id !== id));
      alert(`${name} has been unblocked successfully.`);
    }
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitReport = (e) => {
    e.preventDefault();
    alert(
      "Report submitted successfully!\n\nOur team will review your report within 24-48 hours.\n\nThank you for helping us maintain a safe community.",
    );
    setReportForm({ profileId: "", reason: "", details: "" });
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Tabs */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <div
            className={`card ${activeTab === "blocked" ? "border-danger" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("blocked")}
          >
            <div className="card-body text-center">
              <h5 className="mb-2">🚫 Blocked Users</h5>
              <p className="text-muted mb-0">
                {blockedUsers.length} users blocked
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div
            className={`card ${activeTab === "report" ? "border-danger" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveTab("report")}
          >
            <div className="card-body text-center">
              <h5 className="mb-2">⚠️ Report Profile</h5>
              <p className="text-muted mb-0">Report fake or inappropriate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blocked Users Tab */}
      {activeTab === "blocked" && (
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Blocked Users</h5>
            <p className="text-muted mb-4">
              These users cannot view your profile or contact you
            </p>

            {blockedUsers.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {blockedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center justify-content-between p-3 bg-light rounded"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "1.2rem",
                        }}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <h6 className="mb-1">{user.name}</h6>
                        <small className="text-muted">
                          Blocked on: {user.blockedDate}
                        </small>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => unblockUser(user.id, user.name)}
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-shield-check fs-1 text-success mb-3 d-block"></i>
                <h5>No Blocked Users</h5>
                <p className="text-muted">You haven't blocked anyone yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Report Profile Tab */}
      {activeTab === "report" && (
        <div className="card">
          <div className="card-body">
            <h5 className="mb-3">Report a Profile</h5>
            <p className="text-muted mb-4">
              Help us maintain a safe community by reporting suspicious profiles
            </p>

            <form onSubmit={submitReport}>
              <div className="mb-3">
                <label className="form-label">
                  Profile ID or Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="profileId"
                  value={reportForm.profileId}
                  onChange={handleReportChange}
                  placeholder="Enter profile ID or name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Reason for Report <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="reason"
                  value={reportForm.reason}
                  onChange={handleReportChange}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="fake">Fake Profile</option>
                  <option value="photos">Inappropriate Photos</option>
                  <option value="harassment">Harassment or Abuse</option>
                  <option value="spam">Spam or Scam</option>
                  <option value="behavior">Inappropriate Behavior</option>
                  <option value="info">False Information</option>
                  <option value="married">Already Married</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Additional Details <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="details"
                  value={reportForm.details}
                  onChange={handleReportChange}
                  rows="5"
                  placeholder="Please provide detailed information about your report..."
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Evidence (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                />
                <div className="form-text">
                  Screenshots or any supporting documents
                </div>
              </div>

              <button type="submit" className="btn btn-danger w-100">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockedUsers;
