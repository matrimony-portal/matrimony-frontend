import "./QuickActionsPages.css";

export default function ReportsCounter() {
  return (
    <div className="page reports-box">
      <h2>🚨 Reports Counter</h2>
      <ul>
        <li>
          Fake Profiles <span>8</span>
        </li>
        <li>
          Abusive Language <span>4</span>
        </li>
        <li>
          Spam Accounts <span>3</span>
        </li>
      </ul>
      <button>View All Reports</button>
    </div>
  );
}
