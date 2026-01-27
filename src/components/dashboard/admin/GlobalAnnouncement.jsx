import { toast } from "react-toastify";
import "./QuickActionsPages.css";

const previousAnnouncements = [
  {
    id: 1,
    admin: "Admin John",
    message:
      "New privacy policy updates effective from February 1st, 2024. Please review the changes.",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: 2,
    admin: "Admin Sarah",
    message:
      "Valentine's Day special event - 50% off premium memberships until February 14th!",
    date: "2024-01-10",
    time: "2:15 PM",
  },
  {
    id: 3,
    admin: "Admin Mike",
    message:
      "We've added new matching algorithms for better compatibility. Update your preferences now.",
    date: "2024-01-08",
    time: "4:45 PM",
  },
  {
    id: 4,
    admin: "Admin Lisa",
    message:
      "Mobile app version 2.0 is now available on App Store and Google Play. Download now!",
    date: "2024-01-05",
    time: "11:20 AM",
  },
];

export default function GlobalAnnouncement() {
  const handlePublishAnnouncement = () => {
    toast.success("Announcement published successfully!");
  };

  return (
    <div className="page announcement-box">
      <h2>🌍 Global Announcement</h2>
      <textarea placeholder="Write announcement..." />
      <button onClick={handlePublishAnnouncement}>Publish Announcement</button>

      <div className="previous-messages">
        <h3>Previous Announcements</h3>
        <table className="messages-table">
          <thead>
            <tr>
              <th>Admin</th>
              <th>Announcement</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {previousAnnouncements.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.admin}</td>
                <td>{announcement.message}</td>
                <td>{announcement.date}</td>
                <td>{announcement.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
