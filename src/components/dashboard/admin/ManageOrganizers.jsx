import { useState } from "react";
import { useNavigate } from "react-router";

const ManageOrganizers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const organizers = [
    {
      id: 1,
      name: "Mumbai Events Co.",
      contact: "Rajesh Sharma",
      email: "rajesh@mumbaiEvents.com",
      phone: "+91 9876543210",
      status: "Active",
      eventsCount: 15,
      rating: 4.8,
      joinDate: "2023-06-15",
    },
    {
      id: 2,
      name: "Delhi Matrimony Events",
      contact: "Priya Gupta",
      email: "priya@delhievents.com",
      phone: "+91 9876543211",
      status: "Active",
      eventsCount: 23,
      rating: 4.6,
      joinDate: "2023-08-20",
    },
    {
      id: 3,
      name: "Bangalore Connections",
      contact: "Amit Kumar",
      email: "amit@blrconnections.com",
      phone: "+91 9876543212",
      status: "Pending",
      eventsCount: 0,
      rating: 0,
      joinDate: "2024-01-10",
    },
  ];

  const filteredOrganizers = organizers.filter(
    (organizer) =>
      organizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      organizer.contact.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStatusChange = (organizerId, newStatus) => {
    console.log(`Changing organizer ${organizerId} status to ${newStatus}`);
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Event Organizers</h1>
            <p className="mb-0">
              Manage event organizers and their permissions
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard/admin/add-organizer")}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Organizer
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select className="form-select">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Organizers Grid */}
      <div className="row g-4">
        {filteredOrganizers.map((organizer) => (
          <div key={organizer.id} className="col-md-6 col-lg-4">
            <div className="organizer-card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{organizer.name}</h5>
                    <p className="text-muted mb-0">{organizer.contact}</p>
                  </div>
                  <span
                    className={`badge ${
                      organizer.status === "Active"
                        ? "bg-success"
                        : organizer.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                    }`}
                  >
                    {organizer.status}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <div className="contact-info mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope me-2 text-muted"></i>
                    <small>{organizer.email}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-telephone me-2 text-muted"></i>
                    <small>{organizer.phone}</small>
                  </div>
                </div>

                <div className="stats-row mb-3">
                  <div className="stat">
                    <div className="stat-number">{organizer.eventsCount}</div>
                    <div className="stat-label">Events</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">
                      {organizer.rating > 0 ? organizer.rating : "N/A"}
                    </div>
                    <div className="stat-label">Rating</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">
                      {new Date(organizer.joinDate).getFullYear()}
                    </div>
                    <div className="stat-label">Joined</div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye me-1"></i>
                    View
                  </button>
                  <button className="btn btn-outline-warning btn-sm">
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                  <button
                    className={`btn btn-sm ${
                      organizer.status === "Active"
                        ? "btn-outline-danger"
                        : "btn-outline-success"
                    }`}
                    onClick={() =>
                      handleStatusChange(
                        organizer.id,
                        organizer.status === "Active" ? "Suspended" : "Active",
                      )
                    }
                  >
                    <i
                      className={`bi ${
                        organizer.status === "Active"
                          ? "bi-ban"
                          : "bi-check-circle"
                      } me-1`}
                    ></i>
                    {organizer.status === "Active" ? "Suspend" : "Activate"}
                  </button>
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

        .organizer-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s;
        }

        .organizer-card:hover {
          transform: translateY(-5px);
        }

        .organizer-card .card-header {
          background: #f8f9fa;
          padding: 1.25rem;
          border-bottom: 1px solid #e9ecef;
        }

        .organizer-card .card-body {
          padding: 1.25rem;
        }

        .contact-info {
          font-size: 0.875rem;
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          text-align: center;
        }

        .stat {
          flex: 1;
        }

        .stat-number {
          font-size: 1.25rem;
          font-weight: bold;
          color: #ae1700;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .action-buttons .btn {
          flex: 1;
          min-width: 70px;
        }

        @media (max-width: 768px) {
          .page-header .d-flex {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageOrganizers;
