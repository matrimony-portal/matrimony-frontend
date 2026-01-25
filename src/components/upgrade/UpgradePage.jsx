import { useNavigate } from "react-router";
import { useUserCapabilities } from "../../hooks/useUserCapabilities.jsx";

const benefits = [
  "Unlimited searches and advanced filters",
  "Priority visibility in recommendations",
  "Direct messaging without limits",
  "Access to premium-only events",
  "See who viewed or shortlisted your profile",
];

const UpgradePage = () => {
  const navigate = useNavigate();
  const { isPremium } = useUserCapabilities();

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-3">Upgrade to Premium</h1>
              <p className="text-muted">
                Unlock the full experience: richer searches, unlimited
                messaging, and early access to exclusive events.
              </p>

              <ul className="list-group list-group-flush mb-4">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="list-group-item d-flex align-items-center"
                  >
                    <i className="bi bi-star-fill text-warning me-2"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => alert("Integrate payment flow here.")}
                  disabled={isPremium}
                >
                  {isPremium ? "Already Premium" : "Upgrade Now"}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
