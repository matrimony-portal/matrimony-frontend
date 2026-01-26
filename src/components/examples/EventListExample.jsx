/**
 * Example: Event List with Zustand Store + Skeleton Loading + Empty State
 * This demonstrates the new patterns for data fetching and UI
 */
import { useEffect } from "react";
import { useEventStore } from "../../stores/useEventStore.js";
import { EventCardSkeleton } from "../ui/Skeleton.jsx";
import { EmptyState } from "../ui/EmptyState.jsx";
import { toast } from "react-toastify";

export function EventListExample() {
  const {
    events,
    loading,
    error,
    filters,
    fetchEvents,
    setFilters,
    clearFilters,
  } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchEvents();
  };

  if (loading && events.length === 0) {
    return (
      <div className="row">
        <EventCardSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    toast.error(error);
  }

  if (events.length === 0 && !loading) {
    return (
      <EmptyState
        icon="calendar-x"
        title="No Events Found"
        description="There are no events matching your criteria. Try adjusting your filters or check back later."
        action={{
          label: "Clear Filters",
          onClick: () => {
            clearFilters();
            fetchEvents();
          },
          variant: "outline-primary",
        }}
      />
    );
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5>Filter Events</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search events..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={filters.status || ""}
                onChange={(e) =>
                  handleFilterChange({ status: e.target.value || null })
                }
              >
                <option value="">All Status</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  clearFilters();
                  fetchEvents();
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text text-muted">{event.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <i className="bi bi-calendar me-2"></i>
                    {new Date(event.eventDate).toLocaleDateString()}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <i className="bi bi-geo-alt me-2"></i>
                    {event.city}, {event.state}
                  </small>
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-sm w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && events.length > 0 && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading more events...</span>
          </div>
        </div>
      )}
    </div>
  );
}
