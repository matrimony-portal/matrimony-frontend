import { Link } from "react-router";
import "./QuickActionsPages.css";

const reportsData = [
  {
    id: 1,
    reportedUser: "John Doe",
    reportedBy: "Sarah Smith",
    reason: "Fake Profile",
    description: "Profile photos don't match, suspicious activity",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "Under Review",
    actionTakenBy: "-",
    actionDate: "-",
  },
  {
    id: 2,
    reportedUser: "Mike Johnson",
    reportedBy: "Lisa Brown",
    reason: "Abusive Language",
    description: "Used inappropriate language in messages",
    date: "2024-01-14",
    time: "3:45 PM",
    status: "Resolved",
    actionTakenBy: "Admin Sarah",
    actionDate: "2024-01-14",
  },
  {
    id: 3,
    reportedUser: "Alex Wilson",
    reportedBy: "Emma Davis",
    reason: "Spam Account",
    description: "Sending promotional messages to multiple users",
    date: "2024-01-13",
    time: "11:20 AM",
    status: "Resolved",
    actionTakenBy: "Admin John",
    actionDate: "2024-01-13",
  },
  {
    id: 4,
    reportedUser: "Chris Taylor",
    reportedBy: "Anna White",
    reason: "Fake Profile",
    description: "Using celebrity photos, false information",
    date: "2024-01-12",
    time: "2:15 PM",
    status: "Under Review",
    actionTakenBy: "-",
    actionDate: "-",
  },
  {
    id: 5,
    reportedUser: "David Lee",
    reportedBy: "Rachel Green",
    reason: "Harassment",
    description: "Persistent unwanted messages after being blocked",
    date: "2024-01-11",
    time: "6:30 PM",
    status: "Resolved",
    actionTakenBy: "Admin Mike",
    actionDate: "2024-01-12",
  },
];

export default function ReportsCounter() {
  return (
    <div className="page reports-box">
      <div className="page-header">
        <Link to="/dashboard/admin" className="back-btn">
          ← Back to Dashboard
        </Link>
        <h2>🚨 Reports Counter</h2>
      </div>

      <div className="reports-summary">
        <div className="summary-item">
          <span className="count">8</span>
          <span className="label">Fake Profiles</span>
        </div>
        <div className="summary-item">
          <span className="count">4</span>
          <span className="label">Abusive Language</span>
        </div>
        <div className="summary-item">
          <span className="count">3</span>
          <span className="label">Spam Accounts</span>
        </div>
        <div className="summary-item">
          <span className="count">2</span>
          <span className="label">Harassment</span>
        </div>
      </div>

      <div className="reports-table-container">
        <h3>Detailed Reports</h3>
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reported User</th>
              <th>Reported By</th>
              <th>Reason</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action Taken By</th>
              <th>Action Date</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reportedUser}</td>
                <td>{report.reportedBy}</td>
                <td>
                  <span
                    className={`reason-badge ${report.reason.toLowerCase().replace(" ", "-")}`}
                  >
                    {report.reason}
                  </span>
                </td>
                <td className="description">{report.description}</td>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>
                  <span
                    className={`status-badge ${report.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>{report.actionTakenBy}</td>
                <td>{report.actionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
