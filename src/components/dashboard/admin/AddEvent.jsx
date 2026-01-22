import "./QuickActionsPages.css";

export default function AddEvent() {
  return (
    <div className="page">
      <h2>📅 Add New Event</h2>
      <div className="event-form">
        <input placeholder="Event Title" />
        <input type="date" />
        <input placeholder="Location" />
        <input placeholder="Organizer" />
        <textarea placeholder="Event Description" />
      </div>
      <button>Create Event</button>
    </div>
  );
}
