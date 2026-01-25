// src/components/dashboard/premium/Messages.jsx
// Re-exports shared Messages component with premium user defaults
import Messages from "../shared/Messages.jsx";

const PremiumMessages = () => <Messages userType="premium" />;

export default PremiumMessages;
