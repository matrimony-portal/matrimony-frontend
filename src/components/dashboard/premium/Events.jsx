// src/components/dashboard/premium/Events.jsx
// Re-exports shared Events component with premium user configuration
import Events from "../shared/Events.jsx";

// Premium users may have access to additional event features
// For now, use the shared component with premium userType
const PremiumEvents = () => <Events userType="premium" />;

export default PremiumEvents;
