import "./Dashboard.css";

const FreeProposals = () => (
  <div className="modern-dashboard">
    <div className="page-header">
      <h1>Proposals</h1>
      <p className="text-muted">Manage your proposals</p>
    </div>
    <div className="empty-state">
      <i className="bi bi-envelope-heart"></i>
      <h3>No proposals yet</h3>
      <p>Proposals will appear here</p>
    </div>
  </div>
);

export default FreeProposals;
