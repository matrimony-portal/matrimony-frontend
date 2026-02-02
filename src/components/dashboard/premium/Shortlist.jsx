// src/components/dashboard/premium/Shortlist.jsx
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "../../../utils/toast.js";
import useConfirmation from "../../../hooks/useConfirmation.js";
import ConfirmationModal from "../../ui/ConfirmationModal.jsx";

const Shortlist = () => {
  const navigate = useNavigate();
  const { confirm, confirmationProps } = useConfirmation();
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Ananya Mehta",
      age: 27,
      height: "5'5\"",
      education: "Masters",
      occupation: "Business Analyst",
      location: "Bangalore, Karnataka",
      image: "../../assets/images/female-profile/ananya.png",
    },
    {
      id: 2,
      name: "Priya Agarwal",
      age: 28,
      height: "5'4\"",
      education: "MBA",
      occupation: "Software Engineer",
      location: "Mumbai, Maharashtra",
      image: "../../assets/images/female-profile/priyanka.png",
    },
    {
      id: 3,
      name: "Riya Gupta",
      age: 30,
      height: "5'4\"",
      education: "Masters",
      occupation: "Architect",
      location: "Pune, Maharashtra",
      image: "../../assets/images/female-profile/riya.png",
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      age: 26,
      height: "5'3\"",
      education: "MBBS",
      occupation: "Doctor",
      location: "Delhi, India",
      image: "../../assets/images/female-profile/sneha.png",
    },
    {
      id: 5,
      name: "Neha Reddy",
      age: 29,
      height: "5'6\"",
      education: "MBA",
      occupation: "Marketing Manager",
      location: "Hyderabad, Telangana",
      image: "../../assets/images/female-profile/neha.png",
    },
  ]);

  const removeFromShortlist = useCallback(
    async (id, name) => {
      const ok = await confirm({
        title: "Remove from shortlist",
        message: `Remove ${name} from shortlist?`,
      });
      if (ok) {
        setProfiles((p) => p.filter((profile) => profile.id !== id));
        toast.success(`${name} removed from shortlist.`);
      }
    },
    [confirm],
  );

  const sendInterest = useCallback((name) => {
    toast.info(`Sending interest to ${name}!`);
  }, []);

  const viewProfile = (id) => {
    navigate(`/dashboard/profile/${id}`);
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <ConfirmationModal {...confirmationProps} />
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-2">⭐ My Shortlist</h1>
        <p className="text-muted">
          {profiles.length} profiles saved for later review
        </p>
      </div>

      {profiles.length > 0 ? (
        <div className="row g-3 g-md-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="position-relative">
                  <div
                    style={{
                      paddingTop: "100%",
                      backgroundImage: `url(${profile.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                    onClick={() =>
                      removeFromShortlist(profile.id, profile.name)
                    }
                  >
                    <i className="bi bi-x-lg"></i> Remove
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-2">{profile.name}</h5>
                  <div className="text-muted small mb-3">
                    <div>
                      {profile.age} years, {profile.height}
                    </div>
                    <div>
                      {profile.education}, {profile.occupation}
                    </div>
                    <div>{profile.location}</div>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => sendInterest(profile.name)}
                    >
                      Send Interest
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => viewProfile(profile.id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-star fs-1 text-muted mb-3 d-block"></i>
            <h5>Your Shortlist is Empty</h5>
            <p className="text-muted mb-4">
              Start adding profiles to your shortlist to keep track of
              interesting matches
            </p>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/dashboard/search")}
            >
              <i className="bi bi-search me-2"></i>
              Browse Matches
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shortlist;
