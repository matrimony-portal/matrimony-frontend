import { Link } from "react-router";
import { toast } from "react-toastify";
import "./QuickActionsPages.css";

const previousEvents = [
  {
    id: 1,
    title: "Valentine's Day Mixer",
    date: "2024-02-14",
    time: "7:00 PM",
    location: "Grand Ballroom, Hotel Paradise",
    organizer: "Admin Sarah",
    description:
      "Special Valentine's Day event for premium members to meet and connect",
    status: "Upcoming",
    attendees: 45,
    createdBy: "Admin Sarah",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Speed Dating Night",
    date: "2024-01-20",
    time: "6:30 PM",
    location: "Community Center, Downtown",
    organizer: "Admin John",
    description: "Fast-paced dating event for young professionals aged 25-35",
    status: "Completed",
    attendees: 32,
    createdBy: "Admin John",
    createdDate: "2024-01-05",
  },
  {
    id: 3,
    title: "Cultural Evening",
    date: "2024-01-25",
    time: "5:00 PM",
    location: "Art Gallery, City Center",
    organizer: "Admin Mike",
    description:
      "Cultural event featuring traditional music, dance, and networking",
    status: "Upcoming",
    attendees: 28,
    createdBy: "Admin Mike",
    createdDate: "2024-01-10",
  },
  {
    id: 4,
    title: "Coffee & Conversations",
    date: "2024-01-18",
    time: "3:00 PM",
    location: "Café Mocha, Main Street",
    organizer: "Admin Lisa",
    description: "Casual coffee meetup for new members to break the ice",
    status: "Completed",
    attendees: 18,
    createdBy: "Admin Lisa",
    createdDate: "2024-01-08",
  },
];

export default function AddEvent() {
  const handleCreateEvent = () => {
    toast.success("Event created successfully!");
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/dashboard/admin" className="back-btn">
          ← Back to Dashboard
        </Link>
        <h2>📅 Add New Event</h2>
      </div>
      <div className="event-form">
        <input placeholder="Event Title" />
        <input type="date" />
        <input type="time" placeholder="Time" />
        <input placeholder="Location" />
        <input placeholder="Organizer" />
        <textarea placeholder="Event Description" />
      </div>
      <button onClick={handleCreateEvent}>Create Event</button>

      <div className="previous-messages">
        <h3>Previous Events</h3>
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Organizer</th>
              <th>Status</th>
              <th>Attendees</th>
              <th>Created By</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {previousEvents.map((event) => (
              <tr key={event.id}>
                <td className="event-title">{event.title}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td className="location">{event.location}</td>
                <td>{event.organizer}</td>
                <td>
                  <span
                    className={`status-badge ${event.status.toLowerCase()}`}
                  >
                    {event.status}
                  </span>
                </td>
                <td>{event.attendees}</td>
                <td>{event.createdBy}</td>
                <td>{event.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
