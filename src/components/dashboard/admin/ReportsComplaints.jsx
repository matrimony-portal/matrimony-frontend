import React, { useState } from "react";

const ReportsComplaints = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");

  const reports = [
    {
      id: 1,
      type: "Inappropriate Behavior",
      reporter: "Priya Sharma",
      reported: "John Doe",
      description: "User sent inappropriate messages and photos",
      date: "2024-01-15",
      status: "Pending",
      priority: "High",
      evidence: ["Screenshot 1", "Screenshot 2"],
    },
    {
      id: 2,
      type: "Fake Profile",
      reporter: "Rahul Kumar",
      reported: "Jane Smith",
      description: "Profile uses fake photos and information",
      date: "2024-01-14",
      status: "Under Review",
      priority: "Medium",
      evidence: ["Photo comparison"],
    },
    {
      id: 3,
      type: "Spam/Scam",
      reporter: "Anjali Patel",
      reported: "Mike Johnson",
      description: "User asking for money and personal information",
      date: "2024-01-13",
      status: "Resolved",
      priority: "High",
      evidence: ["Chat logs"],
    },
  ];

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reported.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending")
      return matchesSearch && report.status === "Pending";
    if (activeTab === "review")
      return matchesSearch && report.status === "Under Review";
    if (activeTab === "resolved")
      return matchesSearch && report.status === "Resolved";

    return matchesSearch;
  });

  const handleStatusChange = (reportId, newStatus) => {
    console.log(`Changing report ${reportId} status to ${newStatus}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-danger";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-success";
      default:
        return "text-muted";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Under Review":
        return "bg-info";
      case "Resolved":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="page-header mb-4">
        <h1>Reports & Complaints</h1>
        <p className="mb-0">Manage user reports and complaints</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <div className="btn-group w-100" role="group">
                <button
                  className={`btn ${activeTab === "pending" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("pending")}
                >
                  Pending
                </button>
                <button
                  className={`btn ${activeTab === "review" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("review")}
                >
                  Under Review
                </button>
                <button
                  className={`btn ${activeTab === "resolved" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("resolved")}
                >
                  Resolved
                </button>
                <button
                  className={`btn ${activeTab === "all" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="row g-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="col-12">
            <div className="report-card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">
                      {report.type}
                      <span
                        className={`ms-2 ${getPriorityColor(report.priority)}`}
                      >
                        <i className="bi bi-exclamation-triangle"></i>
                        {report.priority}
                      </span>
                    </h5>
                    <p className="text-muted mb-0">Report #{report.id}</p>
                  </div>
                  <span className={`badge ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="report-details">
                      <div className="detail-row">
                        <strong>Reporter:</strong> {report.reporter}
                      </div>
                      <div className="detail-row">
                        <strong>Reported User:</strong> {report.reported}
                      </div>
                      <div className="detail-row">
                        <strong>Date:</strong>{" "}
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                      <div className="detail-row">
                        <strong>Description:</strong>
                        <p className="mt-1">{report.description}</p>
                      </div>
                      {report.evidence.length > 0 && (
                        <div className="detail-row">
                          <strong>Evidence:</strong>
                          <div className="evidence-list mt-1">
                            {report.evidence.map((evidence, index) => (
                              <span
                                key={index}
                                className="badge bg-light text-dark me-2"
                              >
                                <i className="bi bi-paperclip me-1"></i>
                                {evidence}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="action-panel">
                      <h6>Actions</h6>
                      <div className="d-grid gap-2">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-eye me-1"></i>
                          View Details
                        </button>
                        <button className="btn btn-outline-info btn-sm">
                          <i className="bi bi-person me-1"></i>
                          View Profiles
                        </button>
                        {report.status === "Pending" && (
                          <>
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() =>
                                handleStatusChange(report.id, "Under Review")
                              }
                            >
                              <i className="bi bi-clock me-1"></i>
                              Start Review
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                              <i className="bi bi-ban me-1"></i>
                              Block User
                            </button>
                          </>
                        )}
                        {report.status === "Under Review" && (
                          <>
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() =>
                                handleStatusChange(report.id, "Resolved")
                              }
                            >
                              <i className="bi bi-check-circle me-1"></i>
                              Mark Resolved
                            </button>
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="bi bi-x-circle me-1"></i>
                              Dismiss
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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

        .report-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .report-card .card-header {
          background: #f8f9fa;
          padding: 1.25rem;
          border-bottom: 1px solid #e9ecef;
        }

        .report-card .card-body {
          padding: 1.25rem;
        }

        .report-details {
          font-size: 0.9rem;
        }

        .detail-row {
          margin-bottom: 0.75rem;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .evidence-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .action-panel {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
        }

        .action-panel h6 {
          margin-bottom: 0.75rem;
          color: #333;
        }

        @media (max-width: 768px) {
          .btn-group {
            flex-direction: column;
          }
          
          .report-card .row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportsComplaints;
