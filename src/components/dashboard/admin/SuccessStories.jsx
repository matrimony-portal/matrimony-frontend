import React from "react";
import { useNavigate } from "react-router";
import "./SuccessStories.css";

const successStoriesData = [
  {
    id: 101,
    name: "Rahul",
    age: 20,
    status: "Active",
    verified: "Yes",
  },
  {
    id: 102,
    name: "Priya",
    age: 29,
    status: "Pending",
    verified: "No",
  },
  {
    id: 103,
    name: "Amit",
    age: 35,
    status: "Active",
    verified: "Yes",
  },
];

export default function SuccessStories() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h2 className="success-title">Success Stories</h2>

      <table className="success-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {successStoriesData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.status}</td>
              <td>{item.verified}</td>
              <td>
                {item.verified === "Yes" ? (
                  <button
                    className="btn-view"
                    onClick={() => alert(`Viewing profile of ${item.name}`)}
                  >
                    View
                  </button>
                ) : (
                  <button
                    className="btn-verify"
                    onClick={() => alert(`Verifying profile of ${item.name}`)}
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate("/dashboard/admin")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
