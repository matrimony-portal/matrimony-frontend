// src/components/dashboard/free/Messages.jsx
// Re-exports shared Messages component with free user defaults
import Messages from "../shared/Messages.jsx";

const FreeMessages = () => <Messages userType="free" />;

export default FreeMessages;
