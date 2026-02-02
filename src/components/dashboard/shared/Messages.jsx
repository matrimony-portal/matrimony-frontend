// src/components/dashboard/shared/Messages.jsx
import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router";
import { chatService } from "../../../services/chatService.js";
import { useUserCapabilities } from "../../../hooks/useUserCapabilities.jsx";
import { useDashboardBasePath } from "../../../hooks/useDashboardBasePath.jsx";
import { getRelativeTime } from "../../../utils/dateFormat.js";
import { handleApiError } from "../../../services/api.js";
import { toast } from "../../../utils/toast.js";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/bandhan";

function resolveAvatar(avatarUrl, name) {
  if (avatarUrl?.startsWith("http")) return avatarUrl;
  if (avatarUrl)
    return `${API_BASE.replace(/\/$/, "")}/${avatarUrl.replace(/^\//, "")}`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "?")}`;
}

/**
 * Shared Messages component for free, premium, and organiser dashboards.
 * - Free: upgrade CTA (canMessage false).
 * - Premium & Organiser: full chat via bandhan-chat-service.
 */
const Messages = () => {
  const { canMessage } = useUserCapabilities();
  const basePath = useDashboardBasePath();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [chatsError, setChatsError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Fetch conversations when user can message
  useEffect(() => {
    if (!canMessage) {
      setChatsLoading(false);
      return;
    }
    let cancelled = false;
    setChatsLoading(true);
    setChatsError(null);
    chatService
      .getConversations()
      .then((list) => {
        if (cancelled) return;
        setChats(
          list.map((c) => ({
            id: c.peerId,
            peerId: c.peerId,
            name: c.name,
            avatar: resolveAvatar(c.avatarUrl, c.name),
            lastMessage: c.lastMessage,
            time: getRelativeTime(c.lastAt),
            unread: c.unread || 0,
            isOnline: false,
          })),
        );
      })
      .catch((e) => {
        if (!cancelled)
          setChatsError(handleApiError(e) || "Unable to load conversations.");
      })
      .finally(() => {
        if (!cancelled) setChatsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [canMessage]);

  // Fetch messages when selecting a chat
  const peerId = selectedChat?.peerId ?? selectedChat?.id;
  useEffect(() => {
    if (!canMessage || !peerId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    setMessagesLoading(true);
    chatService
      .getMessages(peerId)
      .then((list) => {
        if (cancelled) return;
        setMessages(
          list.map((m) => ({
            id: m.id,
            text: m.content,
            sender: m.isMe ? "me" : "them",
            time: new Date(m.sentAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
        );
      })
      .catch(() => {
        if (!cancelled) setMessages([]);
      })
      .finally(() => {
        if (!cancelled) setMessagesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [canMessage, peerId]);

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const q = searchQuery.toLowerCase().trim();
    return chats.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.lastMessage?.toLowerCase().includes(q),
    );
  }, [searchQuery, chats]);

  const handleChatSelect = useCallback((chat) => {
    setSelectedChat(chat);
    if (typeof window !== "undefined" && window.innerWidth < 768)
      setShowChatList(false);
  }, []);

  const handleBackToList = useCallback(() => {
    setShowChatList(true);
    setSelectedChat(null);
  }, []);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      const text = String(message || "").trim();
      if (!text || !peerId || sending || !canMessage) return;
      setSending(true);
      try {
        const m = await chatService.sendMessage(peerId, text);
        setMessages((prev) => [
          ...prev,
          {
            id: m.id,
            text: m.content,
            sender: "me",
            time: new Date(m.sentAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setMessage("");
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          handleApiError(err) ||
          "Failed to send.";
        toast.error(msg);
        const code =
          err.response?.data?.code ?? err.response?.data?.message?.code;
        if (code === "PREMIUM_REQUIRED") {
          toast.info("Upgrade to Premium to unlock messaging.");
        }
      } finally {
        setSending(false);
      }
    },
    [message, peerId, sending, canMessage],
  );

  const handleClearSearch = useCallback(() => setSearchQuery(""), []);

  // Free user: show upgrade CTA
  if (!canMessage) {
    return (
      <div className="container-fluid py-3 py-md-4">
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <i
              className="bi bi-chat-dots text-muted"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5 className="mt-3">Unlock messaging</h5>
            <p className="text-muted mb-4">
              Upgrade to Premium to chat with your matches. Event organisers get
              messaging included.
            </p>
            <Link to="/upgrade" className="btn btn-danger">
              Upgrade to Premium
            </Link>
            <span className="mx-2">or</span>
            <Link to="/subscription" className="btn btn-outline-danger">
              View plans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 py-md-4">
      <div
        className="card"
        style={{ height: "calc(100vh - 140px)", minHeight: "500px" }}
      >
        <div className="row g-0 h-100">
          <div
            className={`col-12 col-md-4 border-end ${!showChatList && selectedChat ? "d-none d-md-block" : ""}`}
          >
            <div className="p-3 border-bottom">
              <h5 className="mb-0">Messages</h5>
              <small className="text-muted">
                {searchQuery.trim()
                  ? `${filteredChats.length} of ${chats.length} conversations`
                  : `${chats.length} conversations`}
              </small>
            </div>
            <div className="p-3 border-bottom">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary border-start-0"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
            <div
              className="overflow-auto"
              style={{ height: "calc(100% - 130px)" }}
            >
              {chatsLoading ? (
                <div className="p-4 text-center text-muted">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                  <p className="mb-0 mt-2">Loading…</p>
                </div>
              ) : chatsError ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <p className="mb-0 mt-2">{chatsError}</p>
                </div>
              ) : filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 border-bottom ${selectedChat?.id === chat.id ? "bg-light" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleChatSelect(chat)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleChatSelect(chat)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    <div className="d-flex align-items-start">
                      <div
                        className="rounded-circle me-3 flex-shrink-0"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundImage: `url(${chat.avatar})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <h6 className="mb-0">{chat.name}</h6>
                          <small className="text-muted text-nowrap ms-2">
                            {chat.time}
                          </small>
                        </div>
                        <p className="text-muted small mb-0 text-truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="badge bg-danger rounded-pill ms-2">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-chat-dots fs-4 mb-2 d-block"></i>
                  <p className="mb-0">No conversations yet</p>
                  <small>Chats appear when you message your matches</small>
                </div>
              )}
            </div>
          </div>

          <div
            className={`col-12 col-md-8 d-flex flex-column ${showChatList && !selectedChat ? "d-none d-md-flex" : ""}`}
          >
            {selectedChat ? (
              <>
                <div className="p-3 border-bottom d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-link text-dark d-md-none me-2 p-0"
                    onClick={handleBackToList}
                  >
                    <i className="bi bi-arrow-left fs-5"></i>
                  </button>
                  <div
                    className="rounded-circle me-3 flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundImage: `url(${selectedChat.avatar})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{selectedChat.name}</h6>
                    <small className="text-muted">Last seen recently</small>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-link text-dark"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link
                          to={`${basePath}/profile/${selectedChat.peerId}`}
                          className="dropdown-item"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item">Clear Chat</button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item text-danger">
                          Block User
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className="flex-grow-1 overflow-auto p-3"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  {messagesLoading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border spinner-border-sm text-muted" />
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`d-flex mb-3 ${msg.sender === "me" ? "justify-content-end" : ""}`}
                      >
                        <div
                          className={`p-3 rounded-3 ${msg.sender === "me" ? "bg-danger text-white" : "bg-white"}`}
                          style={{ maxWidth: "70%" }}
                        >
                          <p className="mb-1">{msg.text}</p>
                          <small
                            className={
                              msg.sender === "me"
                                ? "text-white-50"
                                : "text-muted"
                            }
                          >
                            {msg.time}
                          </small>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 border-top">
                  <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={sending}
                      />
                      <button
                        className="btn btn-danger"
                        type="submit"
                        aria-label="Send message"
                        disabled={sending || !message.trim()}
                      >
                        {sending ? (
                          <span className="spinner-border spinner-border-sm" />
                        ) : (
                          <i className="bi bi-send-fill"></i>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center text-muted">
                  <i className="bi bi-chat-dots fs-1 mb-3 d-block"></i>
                  <h5>Select a conversation</h5>
                  <p>
                    Choose from your existing conversations or start a new one
                    from Search or Proposals.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
