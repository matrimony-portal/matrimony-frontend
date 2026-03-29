import axios from "axios";

const BASE_URL = "http://localhost:8080";

// Method 1: Get all broadcast messages from database
export const getBroadcastMessages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/broadcast-messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching broadcast messages:", error);
    throw error;
  }
};

// Method 2: Send broadcast message to database
export const sendBroadcastMessage = async (messageData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/broadcast-messages`,
      {
        adminName: messageData.adminName,
        message: messageData.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending broadcast message:", error);
    throw error;
  }
};
