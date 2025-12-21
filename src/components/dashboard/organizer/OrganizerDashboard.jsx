const OrganizerDashboard = () => (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{ background: "var(--bg)" }}
  >
    <div className="text-center">
      <h1 className="display-5 fw-bold text-dark mb-4">Organizer Dashboard</h1>
      <p className="text-muted mb-4">Welcome to your organizer dashboard!</p>
      <button
        onClick={() =>
          (window.location.href = "../event-organizer/organizer-dashboard.html")
        }
        className="btn btn-primary px-4 py-2"
      >
        View Original Dashboard
      </button>
    </div>
  </div>
);

export default OrganizerDashboard;
