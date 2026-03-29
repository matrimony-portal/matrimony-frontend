import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {
  getBroadcastMessages,
  sendBroadcastMessage,
} from "../../../services/admin/broadcastService";
import "./QuickActionsPages.css";

export default function BroadcastMessage() {
  const [message, setMessage] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const messages = await getBroadcastMessages();
      setPreviousMessages(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      // Fallback to mock data
      setPreviousMessages([
        {
          id: 1,
          admin: "Admin John",
          message:
            "Welcome to our new matrimony platform! Find your perfect match today.",
          date: "2024-01-15",
          time: "10:30 AM",
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setLoading(true);
    try {
      const messageData = {
        message: message.trim(),
        adminName: parseInt(localStorage.getItem("adminName") || "1"),
      };

      console.log("Sending message data:", messageData);
      const response = await sendBroadcastMessage(messageData);
      console.log("Response:", response);

      toast.success("Message sent to all registered users!");
      setMessage("");
      fetchMessages(); // Refresh the list
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page broadcast-box">
      <div className="page-header">
        <Link to="/dashboard/admin" className="back-btn">
          ← Back to Dashboard
        </Link>
        <h2>📢 Broadcast Message</h2>
      </div>

      <div className="form-section">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message for all users..."
          rows="4"
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send to All Users"}
        </button>
      </div>

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
                <td>{msg.admin || msg.adminName || "Admin"}</td>
                <td>{msg.message}</td>
                <td>
                  {msg.date || new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td>
                  {msg.time || new Date(msg.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
