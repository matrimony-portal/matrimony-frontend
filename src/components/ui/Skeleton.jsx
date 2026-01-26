import PropTypes from "prop-types";

/**
 * Skeleton Loading Component
 * Shows loading placeholders instead of spinners
 * Better perceived performance
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
  circle = false,
}) {
  const variants = {
    text: "skeleton-text",
    circle: "skeleton-circle",
    rect: "skeleton-rect",
    card: "skeleton-card",
  };

  const style = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;
  if (circle) {
    style.borderRadius = "50%";
    style.width = style.width || style.height || "40px";
    style.height = style.height || style.width || "40px";
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton ${variants[variant]} ${className}`}
          style={style}
          aria-label="Loading..."
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ))}
    </>
  );
}

Skeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "circle", "rect", "card"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  count: PropTypes.number,
  className: PropTypes.string,
  circle: PropTypes.bool,
};

/**
 * Profile Card Skeleton
 */
export function ProfileCardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card profile-card-skeleton mb-3">
          <Skeleton variant="rect" height="200px" className="rounded-top" />
          <div className="card-body">
            <Skeleton
              variant="text"
              width="60%"
              height="24px"
              className="mb-2"
            />
            <Skeleton
              variant="text"
              width="40%"
              height="16px"
              className="mb-2"
            />
            <Skeleton
              variant="text"
              width="80%"
              height="16px"
              className="mb-3"
            />
            <div className="d-flex gap-2">
              <Skeleton variant="rect" width="100px" height="36px" />
              <Skeleton variant="rect" width="100px" height="36px" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

ProfileCardSkeleton.propTypes = {
  count: PropTypes.number,
};

/**
 * Event Card Skeleton
 */
export function EventCardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card event-card-skeleton mb-3">
          <div className="card-body">
            <Skeleton
              variant="text"
              width="70%"
              height="28px"
              className="mb-2"
            />
            <Skeleton
              variant="text"
              width="50%"
              height="16px"
              className="mb-3"
            />
            <Skeleton
              variant="text"
              width="100%"
              height="16px"
              className="mb-1"
            />
            <Skeleton
              variant="text"
              width="90%"
              height="16px"
              className="mb-3"
            />
            <div className="d-flex gap-2">
              <Skeleton variant="rect" width="120px" height="32px" />
              <Skeleton variant="rect" width="120px" height="32px" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

EventCardSkeleton.propTypes = {
  count: PropTypes.number,
};
