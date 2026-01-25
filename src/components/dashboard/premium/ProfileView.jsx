// src/components/dashboard/premium/ProfileView.jsx
// Re-exports shared ProfileView component with premium user configuration
import ProfileView from "../shared/ProfileView.jsx";

const PremiumProfileView = () => <ProfileView userType="premium" />;

export default PremiumProfileView;
