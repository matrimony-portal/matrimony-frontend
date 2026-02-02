// src/components/dashboard/free/Events.jsx
// Re-exports shared Events: same as premium – fetch from DB, no "my events" toggle (users can't host)
import Events from "../shared/Events.jsx";

const FreeEvents = () => <Events userType="free" />;

export default FreeEvents;
