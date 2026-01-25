import { useState } from "react";
import { useNavigate } from "react-router";

const ManageSuccessStories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const stories = [
    {
      id: 1,
      title: "Rahul & Priya - A Perfect Match",
      couple: "Rahul Kumar & Priya Sharma",
      location: "Mumbai, Maharashtra",
      date: "2024-01-15",
      status: "Published",
      views: 1250,
      likes: 89,
      image: "/assets/images/happy-couple/naeem-ad-qZqjCgYEWl4-unsplash.jpg",
    },
    {
      id: 2,
      title: "Love Found Through Events",
      couple: "Amit Singh & Sneha Patel",
      location: "Delhi, India",
      date: "2024-02-20",
      status: "Published",
      views: 980,
      likes: 67,
      image:
        "/assets/images/happy-couple/amish-thakkar-REmCdjjUeB8-unsplash.jpg",
    },
    {
      id: 3,
      title: "From Chat to Marriage",
      couple: "Vikram Reddy & Meera Gupta",
      location: "Bangalore, Karnataka",
      date: "2024-03-10",
      status: "Draft",
      views: 0,
      likes: 0,
      image: "/assets/images/happy-couple/arto-suraj-U24mGMjnIIo-unsplash.jpg",
    },
  ];

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.couple.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStatusChange = (storyId, newStatus) => {
    console.log(`Changing story ${storyId} status to ${newStatus}`);
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      {/* Page Header */}
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Success Stories</h1>
            <p className="mb-0">Manage and moderate success stories</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard/admin/add-success-story")}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Story
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select className="form-select">
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending Review</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="row g-4">
        {filteredStories.map((story) => (
          <div key={story.id} className="col-md-6 col-lg-4">
            <div className="story-card">
              <div className="story-image">
                <img src={story.image} alt={story.couple} />
                <span
                  className={`badge position-absolute top-0 end-0 m-2 ${
                    story.status === "Published"
                      ? "bg-success"
                      : story.status === "Draft"
                        ? "bg-secondary"
                        : "bg-warning"
                  }`}
                >
                  {story.status}
                </span>
              </div>

              <div className="card-body">
                <h5 className="card-title">{story.title}</h5>
                <p className="text-muted mb-2">{story.couple}</p>
                <p className="text-muted small mb-3">
                  <i className="bi bi-geo-alt me-1"></i>
                  {story.location}
                </p>

                <div className="stats-row mb-3">
                  <div className="stat">
                    <i className="bi bi-eye me-1"></i>
                    {story.views}
                  </div>
                  <div className="stat">
                    <i className="bi bi-heart me-1"></i>
                    {story.likes}
                  </div>
                  <div className="stat">
                    <i className="bi bi-calendar me-1"></i>
                    {new Date(story.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="bi bi-eye me-1"></i>
                    View
                  </button>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/edit-success-story/${story.id}`,
                      )
                    }
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                  <button
                    className={`btn btn-sm ${
                      story.status === "Published"
                        ? "btn-outline-secondary"
                        : "btn-outline-success"
                    }`}
                    onClick={() =>
                      handleStatusChange(
                        story.id,
                        story.status === "Published" ? "Draft" : "Published",
                      )
                    }
                  >
                    <i
                      className={`bi ${
                        story.status === "Published"
                          ? "bi-eye-slash"
                          : "bi-check-circle"
                      } me-1`}
                    ></i>
                    {story.status === "Published" ? "Unpublish" : "Publish"}
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

        .story-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s;
        }

        .story-card:hover {
          transform: translateY(-5px);
        }

        .story-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-body {
          padding: 1.25rem;
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: #666;
        }

        .stat {
          display: flex;
          align-items: center;
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

export default ManageSuccessStories;
