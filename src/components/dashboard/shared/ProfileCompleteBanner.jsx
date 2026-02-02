import { Link } from "react-router";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";

/**
 * Shown when profile completion is < 100%. Asks user to complete profile.
 * @param {Object} props
 * @param {number} props.percent - 0–100
 * @param {boolean} props.dismissible - if true, allow hiding (call onDismiss)
 * @param {function} props.onDismiss - optional, when user dismisses
 */
const ProfileCompleteBanner = ({ percent, dismissible = false, onDismiss }) => {
  const base = useDashboardBasePath();
  if (percent >= 100) return null;

  return (
    <div className="alert alert-info border-0 shadow-sm mb-3 mb-md-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
      <div className="d-flex align-items-center gap-2 flex-grow-1">
        <i className="bi bi-info-circle-fill fs-5" aria-hidden="true" />
        <div>
          <strong>Complete your profile</strong>
          <span className="ms-2 text-muted">
            — You&apos;re at {percent}%. Add more details to get better matches.
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Link to={`${base}/edit-profile`} className="btn btn-sm btn-danger">
          Complete profile
        </Link>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="btn-close"
            aria-label="Dismiss"
            onClick={onDismiss}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCompleteBanner;
