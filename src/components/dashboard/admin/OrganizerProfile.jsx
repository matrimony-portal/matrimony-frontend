import React from "react";
import { useNavigate, useParams } from "react-router";

const OrganizerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call
  const organizer = {
    id: 1,
    name: "Mumbai Events Co.",
    contact: "Rajesh Sharma",
    email: "rajesh@mumbaiEvents.com",
    phone: "+91 9876543210",
    status: "Active",
    joinDate: "2023-06-15",
    address:
      "123 Business District, Andheri East, Mumbai, Maharashtra - 400069",
    experience: "6-10 years",
    specialization: "Speed Dating",
    description:
      "Experienced event organizer specializing in matrimonial events and speed dating sessions. We have successfully organized over 50 events with high satisfaction rates.",
    stats: {
      eventsCount: 15,
      rating: 4.8,
      totalParticipants: 450,
      successfulMatches: 23,
    },
    recentEvents: [
      {
        id: 1,
        title: "Speed Dating Mumbai",
        date: "2024-01-20",
        participants: 30,
        status: "Completed",
      },
      {
        id: 2,
        title: "Cultural Evening",
        date: "2024-01-15",
        participants: 25,
        status: "Completed",
      },
      {
        id: 3,
        title: "Professional Meetup",
        date: "2024-02-05",
        participants: 40,
        status: "Upcoming",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Priya S.",
        rating: 5,
        comment: "Excellent organization and great atmosphere!",
        date: "2024-01-21",
      },
      {
        id: 2,
        user: "Rahul K.",
        rating: 4,
        comment: "Well managed event, met some interesting people.",
        date: "2024-01-16",
      },
    ],
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Changing organizer status to ${newStatus}`);
    alert(`Organizer status changed to ${newStatus}`);
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={() => navigate("/dashboard/admin/manage-organizers")}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <div>
              <h1>{organizer.name}</h1>
              <p className="mb-0">Organizer Profile Details</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate(`/dashboard/admin/edit-organizer/${id}`)}
            >
              <i className="bi bi-pencil me-1"></i>
              Edit
            </button>
            <button
              className={`btn ${
                organizer.status === "Active"
                  ? "btn-outline-danger"
                  : "btn-outline-success"
              }`}
              onClick={() =>
                handleStatusChange(
                  organizer.status === "Active" ? "Suspended" : "Active",
                )
              }
            >
              <i
                className={`bi ${
                  organizer.status === "Active" ? "bi-ban" : "bi-check-circle"
                } me-1`}
              ></i>
              {organizer.status === "Active" ? "Suspend" : "Activate"}
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column - Profile Info */}
        <div className="col-lg-8">
          {/* Basic Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Contact Person</label>
                    <div>{organizer.contact}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Status</label>
                    <div>
                      <span
                        className={`badge ${
                          organizer.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {organizer.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Email</label>
                    <div>{organizer.email}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Phone</label>
                    <div>{organizer.phone}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Experience</label>
                    <div>{organizer.experience}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-item">
                    <label>Specialization</label>
                    <div>{organizer.specialization}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="info-item">
                    <label>Address</label>
                    <div>{organizer.address}</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="info-item">
                    <label>Description</label>
                    <div>{organizer.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Recent Events</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Participants</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizer.recentEvents.map((event) => (
                      <tr key={event.id}>
                        <td>{event.title}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.participants}</td>
                        <td>
                          <span
                            className={`badge ${
                              event.status === "Completed"
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Reviews</h5>
            </div>
            <div className="card-body">
              {organizer.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{review.user}</strong>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi bi-star${i < review.rating ? "-fill" : ""} text-warning`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <small className="text-muted">
                      {new Date(review.date).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="col-lg-4">
          {/* Statistics */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Statistics</h5>
            </div>
            <div className="card-body">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">
                    {organizer.stats.eventsCount}
                  </div>
                  <div className="stat-label">Total Events</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{organizer.stats.rating}</div>
                  <div className="stat-label">Average Rating</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {organizer.stats.totalParticipants}
                  </div>
                  <div className="stat-label">Total Participants</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {organizer.stats.successfulMatches}
                  </div>
                  <div className="stat-label">Successful Matches</div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Account Information</h5>
            </div>
            <div className="card-body">
              <div className="info-item mb-3">
                <label>Member Since</label>
                <div>{new Date(organizer.joinDate).toLocaleDateString()}</div>
              </div>
              <div className="info-item mb-3">
                <label>Account ID</label>
                <div>ORG-{organizer.id.toString().padStart(6, "0")}</div>
              </div>
              <div className="info-item">
                <label>Last Activity</label>
                <div>2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
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

        .info-item {
          margin-bottom: 1rem;
        }

        .info-item label {
          display: block;
          font-weight: 600;
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .info-item div {
          color: #333;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ae1700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #666;
          text-transform: uppercase;
        }

        .review-item {
          padding: 1rem 0;
          border-bottom: 1px solid #e9ecef;
        }

        .review-item:last-child {
          border-bottom: none;
        }

        .rating {
          font-size: 0.875rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          border: 1px solid transparent;
        }

        .btn-outline-secondary {
          color: #666;
          border-color: #ddd;
        }

        .btn-outline-secondary:hover {
          background: #f8f9fa;
        }

        .btn-outline-warning {
          color: #f57c00;
          border-color: #f57c00;
        }

        .btn-outline-warning:hover {
          background: #f57c00;
          color: white;
        }

        .btn-outline-danger {
          color: #dc3545;
          border-color: #dc3545;
        }

        .btn-outline-danger:hover {
          background: #dc3545;
          color: white;
        }

        .btn-outline-success {
          color: #28a745;
          border-color: #28a745;
        }

        .btn-outline-success:hover {
          background: #28a745;
          color: white;
        }

        @media (max-width: 768px) {
          .page-header .d-flex {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default OrganizerProfile;
