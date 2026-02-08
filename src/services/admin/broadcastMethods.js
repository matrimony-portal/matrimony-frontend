const API_BASE_URL = "http://localhost:8080";

// Method 1: Send broadcast message to all users
export const sendBroadcastMessage = async (messageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/broadcast-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: messageData.message,
        adminId: messageData.adminId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending broadcast message:", error);
    throw error;
  }
};

// Method 2: Get all broadcast messages from database
export const getBroadcastMessages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/broadcast-messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching broadcast messages:", error);
    throw error;
  }
};
