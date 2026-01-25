// src/components/common/Feedback.jsx
// Re-exports shared Feedback component for public page use
import Feedback from "../dashboard/shared/Feedback.jsx";

const FeedbackPage = () => <Feedback inLayout={false} />;

export default FeedbackPage;
