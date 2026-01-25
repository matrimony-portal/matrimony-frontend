// src/components/dashboard/free/Settings.jsx
// Re-exports shared Settings component with free user defaults
import Settings from "../shared/Settings.jsx";

const FreeSettings = () => <Settings userType="free" />;

export default FreeSettings;
