import { ResponseTypes } from "../../utils/responseStructure";

const ResponseAlert = ({ response, onClose }) => {
  if (!response) return null;

  const getAlertClass = (type) => {
    switch (type) {
      case ResponseTypes.SUCCESS:
        return "alert-success";
      case ResponseTypes.ERROR:
        return "alert-danger";
      case ResponseTypes.WARNING:
        return "alert-warning";
      case ResponseTypes.INFO:
        return "alert-info";
      default:
        return "alert-secondary";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case ResponseTypes.SUCCESS:
        return "✓";
      case ResponseTypes.ERROR:
        return "✗";
      case ResponseTypes.WARNING:
        return "⚠";
      case ResponseTypes.INFO:
        return "ℹ";
      default:
        return "";
    }
  };

  return (
    <div
      className={`alert ${getAlertClass(response.type)} alert-dismissible fade show`}
      role="alert"
    >
      <span className="me-2">{getIcon(response.type)}</span>
      {response.message}
      {response.data?.errors && (
        <ul className="mt-2 mb-0">
          {response.data.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {onClose && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
};

export default ResponseAlert;
