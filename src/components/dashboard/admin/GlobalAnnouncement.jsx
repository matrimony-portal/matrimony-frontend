import "./QuickActionsPages.css";

export default function GlobalAnnouncement() {
  return (
    <div className="page announcement-box">
      <h2>🌍 Global Announcement</h2>
      <textarea placeholder="Write announcement..." />
      <button>Publish Announcement</button>
    </div>
  );
}
