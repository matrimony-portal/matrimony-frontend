import "./QuickActionsPages.css";

export default function BroadcastMessage() {
  return (
    <div className="page broadcast-box">
      <h2>📢 Broadcast Message</h2>
      <textarea placeholder="Write message for all users..." />
      <button>Send to All Users</button>
    </div>
  );
}
