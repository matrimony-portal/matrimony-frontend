const FutureScope = ({
  children,
  title,
  description,
  icon = "bi-clock-history",
}) => {
  return (
    <div className="position-relative">
      {/* Future Scope Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          zIndex: 1000,
          backdropFilter: "blur(1px)",
        }}
      >
        <div className="text-center p-4">
          <i className={`bi ${icon} display-1 text-muted mb-3`}></i>
          <h3 className="mb-3">{title}</h3>
          <p className="text-muted mb-3">{description}</p>
          <span className="badge bg-warning text-dark fs-6 px-3 py-2">
            <i className="bi bi-clock-history me-2"></i>
            Future Scope
          </span>
        </div>
      </div>
      {/* Underlying UI */}
      {children}
    </div>
  );
};

export default FutureScope;
