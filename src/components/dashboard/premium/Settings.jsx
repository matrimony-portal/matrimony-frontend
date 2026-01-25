// src/components/dashboard/premium/Settings.jsx
// Re-exports shared Settings component with premium user defaults
import Settings from "../shared/Settings.jsx";

const PremiumSettings = () => <Settings userType="premium" />;

export default PremiumSettings;
