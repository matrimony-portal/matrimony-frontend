/**
 * Bandhan Chat Service client.
 * Talks to bandhan-chat-service (NestJS) for conversations and messages.
 * Used by free (read-only/upgrade), premium, and organiser dashboards.
 */
import axios from "axios";

const CHAT_BASE =
  import.meta.env.VITE_CHAT_SERVICE_URL || "http://localhost:3001";

const client = axios.create({
  baseURL: CHAT_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("matrimony_token")
      : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401) {
      // Let the app's auth layer handle redirect; we just reject
    }
    return Promise.reject(e);
  },
);

/**
 * @returns {Promise<{ id: number, peerId: number, name: string, avatarUrl: string|null, lastMessage: string, lastAt: string, unread: number }[]>}
 */
export async function getConversations() {
  const { data } = await client.get("/chat/conversations");
  return data?.data ?? [];
}

/**
 * @param {number} peerId
 * @returns {Promise<{ id: number, senderId: number, receiverId: number, content: string, isRead: boolean, sentAt: string, isMe: boolean }[]>}
 */
export async function getMessages(peerId) {
  const { data } = await client.get(`/chat/conversations/${peerId}/messages`);
  return data?.data ?? [];
}

/**
 * @param {number} receiverId
 * @param {string} content
 * @returns {Promise<{ id: number, senderId: number, receiverId: number, content: string, isRead: boolean, sentAt: string, isMe: boolean }>}
 */
export async function sendMessage(receiverId, content) {
  const { data } = await client.post("/chat/send", { receiverId, content });
  return data?.data;
}

export const chatService = { getConversations, getMessages, sendMessage };
export default chatService;
