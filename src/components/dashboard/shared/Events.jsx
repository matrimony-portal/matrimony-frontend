// src/components/dashboard/shared/Events.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import { Pagination } from "../../ui";
import {
  formatEventDate,
  formatTime12Hour,
  formatPrice,
} from "../../../utils/dateFormat.js";
import {
  EVENT_TYPES,
  CITIES,
  DATE_RANGES,
  PRICE_RANGES,
  AGE_GROUPS,
  DEFAULT_EVENT_FILTERS,
  DEFAULT_ITEMS_PER_PAGE,
} from "../../../constants/eventFilters.js";

/**
 * EventFilters - Reusable filter sidebar component
 */
const EventFilters = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
  showFilters,
  onClose,
}) => {
  return (
    <div
      className={`col-12 col-lg-3 ${showFilters ? "" : "d-none d-lg-block"}`}
    >
      <div className="card sticky-top" style={{ top: "70px" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Filter Events</h5>
            <button
              className="btn-close d-lg-none"
              onClick={onClose}
              aria-label="Close filters"
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Event Type</label>
            <select
              className="form-select form-select-sm"
              name="type"
              value={filters.type}
              onChange={onFilterChange}
            >
              {EVENT_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small">City</label>
            <select
              className="form-select form-select-sm"
              name="city"
              value={filters.city}
              onChange={onFilterChange}
            >
              {CITIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small">Date Range</label>
            <select
              className="form-select form-select-sm"
              name="dateRange"
              value={filters.dateRange}
              onChange={onFilterChange}
            >
              {DATE_RANGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small">Price Range</label>
            <select
              className="form-select form-select-sm"
              name="priceRange"
              value={filters.priceRange}
              onChange={onFilterChange}
            >
              {PRICE_RANGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small">Age Group</label>
            <select
              className="form-select form-select-sm"
              name="ageGroup"
              value={filters.ageGroup}
              onChange={onFilterChange}
            >
              {AGE_GROUPS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-danger btn-sm w-100 mb-2"
            onClick={onApply}
          >
            Apply Filters
          </button>
          <button
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={onReset}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

EventFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

/**
 * EventCard - Individual event card component
 */
const EventCard = ({
  event,
  onRegister,
  onViewOrganizer,
  isRegistering = false,
}) => {
  const { day, month } = formatEventDate(event.date);
  const formattedTime = formatTime12Hour(event.time);
  const formattedFee = formatPrice(event.price);
  const spotsLeft =
    (event.maxParticipants || 0) - (event.currentParticipants || 0);
  const isSoldOut = spotsLeft <= 0;

  return (
    <div className="card h-100">
      <div
        className="position-relative"
        style={{
          height: "200px",
          backgroundImage: `url(${event.image || "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg"})`,
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
            {day}
          </div>
          <div className="small">{month}</div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title mb-2">{event.title}</h5>
        <p className="text-muted small mb-3">
          <button
            className="btn btn-link text-decoration-none p-0 text-danger"
            onClick={() => onViewOrganizer?.(event.organizerId)}
            style={{ fontSize: "inherit" }}
          >
            View Event Organizer Profile
          </button>
        </p>
        <div className="small text-muted mb-3">
          <div className="mb-1">
            <i className="bi bi-geo-alt-fill me-2"></i>
            {event.location || event.venue}
          </div>
          <div className="mb-1">
            <i className="bi bi-clock-fill me-2"></i>
            {formattedTime}
          </div>
          <div className="mb-1">
            <i className="bi bi-currency-rupee me-2"></i>
            Entry Fee: {formattedFee}
          </div>
          {event.ageGroup && (
            <div>
              <i className="bi bi-people-fill me-2"></i>
              Age: {event.ageGroup}
            </div>
          )}
        </div>
      </div>
      <div className="card-footer bg-light">
        <div className="d-flex justify-content-between text-center small mb-2">
          <div>
            <div className="fw-bold text-danger">
              {event.currentParticipants || 0}/{event.maxParticipants || 0}
            </div>
            <div className="text-muted">Registered</div>
          </div>
          <div>
            <div className="fw-bold text-danger">{Math.max(spotsLeft, 0)}</div>
            <div className="text-muted">Spots Left</div>
          </div>
        </div>
        <button
          className="btn btn-danger w-100"
          onClick={() => onRegister?.(event.id, event.title)}
          disabled={isSoldOut || isRegistering}
        >
          {isRegistering ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Registering...
            </>
          ) : isSoldOut ? (
            "Fully Booked"
          ) : (
            "Register Now"
          )}
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    venue: PropTypes.string,
    price: PropTypes.number,
    ageGroup: PropTypes.string,
    image: PropTypes.string,
    badge: PropTypes.string,
    organizerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currentParticipants: PropTypes.number,
    maxParticipants: PropTypes.number,
  }).isRequired,
  onRegister: PropTypes.func,
  onViewOrganizer: PropTypes.func,
  isRegistering: PropTypes.bool,
};

/**
 * Shared Events component used across free and premium dashboards.
 * Displays a list of events with filtering and pagination.
 */
const Events = () => {
  const navigate = useNavigate();
  const basePath = useDashboardBasePath();

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_EVENT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [registeringEventId, setRegisteringEventId] = useState(null);

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      // Use real eventService from services
      const { eventService: realEventService } =
        await import("../../../services/eventService.js");
      const events = await realEventService.getEvents();

      // Transform backend response to frontend format
      const transformedEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        organizerId: event.organizerId,
        location: `${event.venue}, ${event.city}`,
        venue: event.venue,
        date: event.eventDate,
        time: new Date(event.eventDate).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        price:
          typeof event.registrationFee === "number"
            ? event.registrationFee
            : parseFloat(event.registrationFee) || 0,
        currentParticipants: event.currentParticipants || 0,
        maxParticipants: event.maxParticipants,
        image: "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg",
      }));

      setAllEvents(transformedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      // Fallback mock data on error
      setAllEvents([
        {
          id: 1,
          title: "Speed Dating Evening",
          organizerId: 1,
          location: "The Coffee House, Mumbai",
          date: new Date().toISOString(),
          time: "18:00",
          price: 500,
          ageGroup: "25-35 years",
          currentParticipants: 45,
          maxParticipants: 50,
          badge: "Hot",
          image: "/assets/images/event-images/surface-aqdPtCtq3dY-unsplash.jpg",
        },
        {
          id: 2,
          title: "Sunday Coffee Meetup",
          organizerId: 2,
          location: "Cafe Mocha, Bangalore",
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          time: "11:00",
          price: 300,
          ageGroup: "23-30 years",
          currentParticipants: 28,
          maxParticipants: 40,
          image:
            "/assets/images/event-images/nathan-dumlao-I_394sxx0ec-unsplash.jpg",
        },
        {
          id: 3,
          title: "Cultural Evening",
          organizerId: 3,
          location: "India Habitat Centre, Delhi",
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:00",
          price: 800,
          ageGroup: "26-38 years",
          currentParticipants: 38,
          maxParticipants: 60,
          badge: "New",
          image:
            "/assets/images/event-images/al-elmes-ULHxWq8reao-unsplash.jpg",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (filters.type && event.type !== filters.type) return false;
      if (
        filters.city &&
        !event.location?.toLowerCase().includes(filters.city.toLowerCase())
      )
        return false;
      // Add more filter logic as needed
      return true;
    });
  }, [allEvents, filters]);

  // Paginate events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE;
    return filteredEvents.slice(
      startIndex,
      startIndex + DEFAULT_ITEMS_PER_PAGE,
    );
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / DEFAULT_ITEMS_PER_PAGE);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    setCurrentPage(1);
    setShowFilters(false);
  }, []);

  const handleResetFilters = useCallback(() => {
    if (window.confirm("Reset all filters to default?")) {
      setFilters(DEFAULT_EVENT_FILTERS);
      setCurrentPage(1);
    }
  }, []);

  const handleRegister = useCallback(
    async (eventId, eventName) => {
      if (
        window.confirm(
          `Register for ${eventName}?\n\nYou will be redirected to payment page.`,
        )
      ) {
        try {
          setRegisteringEventId(eventId);
          const { eventService: realEventService } =
            await import("../../../services/eventService.js");
          await realEventService.registerForEvent(eventId);
          alert(
            "Registration initiated!\n\nPlease complete the payment to confirm your spot.",
          );
          loadEvents();
        } catch (error) {
          console.error("Error registering for event:", error);
          const errorMsg = error.response?.data?.message || error.message;
          if (
            errorMsg?.includes("already registered") ||
            errorMsg?.includes("Already registered")
          ) {
            alert("You are already registered for this event.");
          } else {
            alert(errorMsg || "Failed to register. Please try again.");
          }
        } finally {
          setRegisteringEventId(null);
        }
      }
    },
    [loadEvents],
  );

  const handleViewOrganizer = useCallback(
    (organizerId) => {
      navigate(`${basePath}/organizer-profile/${organizerId}`);
    },
    [navigate, basePath],
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
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
        <EventFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
          showFilters={showFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Events List */}
        <div className="col-12 col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-0">Browse Events</h5>
              <p className="text-muted small mb-0">
                Showing {paginatedEvents.length} of {filteredEvents.length}{" "}
                events
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

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : paginatedEvents.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">
                No events found matching your criteria. Try adjusting your
                filters.
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {paginatedEvents.map((event) => (
                <div key={event.id} className="col-12 col-md-6">
                  <EventCard
                    event={event}
                    onRegister={handleRegister}
                    onViewOrganizer={handleViewOrganizer}
                    isRegistering={registeringEventId === event.id}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

Events.propTypes = {
  userType: PropTypes.oneOf(["free", "premium"]),
};

export default Events;
