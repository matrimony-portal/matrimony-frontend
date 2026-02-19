// src/components/dashboard/premium/Events.jsx
import { useState } from "react";
import FutureScope from "../../common/FutureScope";
//import { useNavigate } from "react-router";

const Events = () => {
  //const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      title: "Speed Dating Evening",
      organizer: "Meera Reddy",
      location: "The Coffee House, Mumbai",
      time: "6:00 PM - 9:00 PM",
      fee: "₹500",
      ageGroup: "25-35 years",
      registered: 45,
      total: 50,
      badge: "Hot",
      day: "25",
      month: "OCT",
      image:
        "../../assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg",
    },
    {
      id: 2,
      title: "Sunday Coffee Meetup",
      organizer: "Rajesh Kumar",
      location: "Cafe Mocha, Bangalore",
      time: "11:00 AM - 2:00 PM",
      fee: "₹300",
      ageGroup: "23-30 years",
      registered: 28,
      total: 40,
      day: "28",
      month: "OCT",
      image:
        "../../assets/images/event-images/nathan-dumlao-I_394sxx0ec-unsplash.jpg",
    },
  ];

  const registerEvent = (eventName) => {
    if (
      window.confirm(
        `Register for ${eventName}?\n\nYou will be redirected to payment page.`,
      )
    ) {
      alert(
        "Registration initiated!\n\nPlease complete the payment to confirm your spot.",
      );
    }
  };

  return (
    <FutureScope
      title="Events & Meetups"
      description="Join exclusive matrimony events and meetups. This feature will be available soon."
      icon="bi-calendar-event"
    >
      <div className="container-fluid py-3 py-md-4">
        {/* Hero Section */}
        <div className="card mb-4 bg-danger text-white">
          <div className="card-body text-center py-4">
            <h1 className="h3 mb-2">📅 Upcoming Events</h1>
            <p className="mb-0">
              Meet potential matches in person at our exclusive meetup events
            </p>
          </div>
        </div>

        <div className="row g-3">
          {/* Filters Sidebar */}
          {/* <div
            className={`col-12 col-lg-3 ${showFilters ? "" : "d-none d-lg-block"}`}
          >
            <div className="card sticky-top">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Filter Events</h5>
                  <button
                    className="btn-close d-lg-none"
                    onClick={() => setShowFilters(false)}
                  ></button>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Event Type</label>
                  <select
                    className="form-select form-select-sm"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="speed-dating">Speed Dating</option>
                    <option value="coffee">Coffee Meetup</option>
                    <option value="dinner">Dinner Event</option>
                    <option value="cultural">Cultural Evening</option>
                    <option value="outdoor">Outdoor Activity</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">City</label>
                  <select
                    className="form-select form-select-sm"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Cities</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Date Range</label>
                  <select
                    className="form-select form-select-sm"
                    name="dateRange"
                    value={filters.dateRange}
                    onChange={handleFilterChange}
                  >
                    <option value="">Anytime</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Price Range</label>
                  <select
                    className="form-select form-select-sm"
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any Price</option>
                    <option value="free">Free Events</option>
                    <option value="0-500">₹0 - ₹500</option>
                    <option value="500-1000">₹500 - ₹1000</option>
                    <option value="1000+">Above ₹1000</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small">Age Group</label>
                  <select
                    className="form-select form-select-sm"
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Ages</option>
                    <option value="21-25">21-25 years</option>
                    <option value="26-30">26-30 years</option>
                    <option value="31-35">31-35 years</option>
                    <option value="36+">36+ years</option>
                  </select>
                </div>

                <button className="btn btn-danger btn-sm w-100 mb-2">
                  Apply Filters
                </button>
                <button className="btn btn-outline-secondary btn-sm w-100">
                  Reset All
                </button>
              </div>
            </div>
          </div> */}

          {/* Events List */}
          <div className="col-12 col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-0">Browse Events</h5>
                <p className="text-muted small mb-0">
                  Showing {events.length} upcoming events
                </p>
              </div>
              <button
                className="btn btn-danger btn-sm d-lg-none"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="bi bi-funnel me-1"></i>
                Filters
              </button>
            </div>

            <div className="row g-3">
              {events.map((event) => (
                <div key={event.id} className="col-12 col-md-6">
                  <div className="card h-100">
                    <div
                      className="position-relative"
                      style={{
                        height: "200px",
                        backgroundImage: `url(${event.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {event.badge && (
                        <span className="badge bg-white text-danger position-absolute top-0 start-0 m-2">
                          {event.badge}
                        </span>
                      )}
                      <div
                        className="position-absolute top-0 end-0 m-2 bg-white rounded text-center p-2"
                        style={{ width: "60px" }}
                      >
                        <div className="fw-bold" style={{ fontSize: "1.5rem" }}>
                          {event.day}
                        </div>
                        <div className="small">{event.month}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mb-2">{event.title}</h5>
                      <p className="text-muted small mb-3">
                        Organized by{" "}
                        <a href="#" className="text-decoration-none">
                          {event.organizer}
                        </a>
                      </p>
                      <div className="small text-muted mb-3">
                        <div className="mb-1">
                          <i className="bi bi-geo-alt-fill me-2"></i>
                          {event.location}
                        </div>
                        <div className="mb-1">
                          <i className="bi bi-clock-fill me-2"></i>
                          {event.time}
                        </div>
                        <div className="mb-1">
                          <i className="bi bi-currency-rupee me-2"></i>
                          Entry Fee: {event.fee}
                        </div>
                        <div>
                          <i className="bi bi-people-fill me-2"></i>
                          Age: {event.ageGroup}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between text-center small mb-2">
                        <div>
                          <div className="fw-bold text-danger">
                            {event.registered}/{event.total}
                          </div>
                          <div className="text-muted">Registered</div>
                        </div>
                        <div>
                          <div className="fw-bold text-danger">
                            {event.total - event.registered}
                          </div>
                          <div className="text-muted">Spots Left</div>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => registerEvent(event.title)}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <button className="page-link">Previous</button>
                </li>
                <li className="page-item active">
                  <button className="page-link">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </FutureScope>
  );
};

export default Events;
