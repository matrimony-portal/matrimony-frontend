// src/components/dashboard/free/ProfileView.jsx
// Re-exports shared ProfileView component with free user configuration
import ProfileView from "../shared/ProfileView.jsx";

const FreeProfileView = () => <ProfileView userType="free" />;

export default FreeProfileView;
