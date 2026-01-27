import { Link } from "react-router";
import { toast } from "react-toastify";
import "./QuickActionsPages.css";

const previousMessages = [
  {
    id: 1,
    admin: "Admin John",
    message:
      "Welcome to our new matrimony platform! Find your perfect match today.",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: 2,
    admin: "Admin Sarah",
    message:
      "New premium features are now available. Upgrade your account for better matches.",
    date: "2024-01-10",
    time: "2:15 PM",
  },
  {
    id: 3,
    admin: "Admin Mike",
    message:
      "System maintenance scheduled for tonight 11 PM - 2 AM. Please plan accordingly.",
    date: "2024-01-08",
    time: "4:45 PM",
  },
];

export default function BroadcastMessage() {
  const handleSendMessage = () => {
    toast.success("Message sent to all users!");
  };

  return (
    <div className="page broadcast-box">
      <div className="page-header">
        <Link to="/dashboard/admin" className="back-btn">
          ← Back to Dashboard
        </Link>
        <h2>📢 Broadcast Message</h2>
      </div>
      <textarea placeholder="Write message for all users..." />
      <button onClick={handleSendMessage}>Send to All Users</button>

      <div className="previous-messages">
        <h3>Previous Messages</h3>
        <table className="messages-table">
          <thead>
            <tr>
              <th>Admin</th>
              <th>Message</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {previousMessages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.admin}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
                <td>{msg.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
