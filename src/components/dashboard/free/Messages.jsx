// src/components/dashboard/premium/Messages.jsx
import React, { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);

  const chats = [
    {
      id: 1,
      name: "Priya Agarwal",
      avatar: "../../assets/images/female-profile/priyanka.png",
      lastMessage:
        "Hi! Thanks for connecting. I'd love to know more about you.",
      time: "2 min ago",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Ananya Mehta",
      avatar: "../../assets/images/female-profile/ananya.png",
      lastMessage: "That sounds interesting! When are you free to talk?",
      time: "1 hour ago",
      unread: 0,
      isOnline: true,
    },
    {
      id: 3,
      name: "Riya Gupta",
      avatar: "../../assets/images/female-profile/riya.png",
      lastMessage: "Thank you! Looking forward to meeting you.",
      time: "3 hours ago",
      unread: 1,
      isOnline: false,
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      avatar: "../../assets/images/female-profile/sneha.png",
      lastMessage: "Hello! Nice to connect with you.",
      time: "Yesterday",
      unread: 0,
      isOnline: false,
    },
  ];

  const messages = selectedChat
    ? [
        {
          id: 1,
          text: "Hi! I came across your profile and I'd love to connect.",
          sender: "me",
          time: "10:30 AM",
        },
        {
          id: 2,
          text: "Hi! Thanks for connecting. I'd love to know more about you.",
          sender: "them",
          time: "10:32 AM",
        },
        {
          id: 3,
          text: "I work as a Product Manager. What about you?",
          sender: "me",
          time: "10:35 AM",
        },
        {
          id: 4,
          text: "That's great! I'm a Software Engineer at a tech company.",
          sender: "them",
          time: "10:37 AM",
        },
        {
          id: 5,
          text: "Nice! Would you like to connect over a video call sometime?",
          sender: "me",
          time: "10:40 AM",
        },
      ]
    : [];

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    if (window.innerWidth < 768) {
      setShowChatList(false);
    }
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      alert(`Message sent: ${message}`);
      setMessage("");
    }
  };

  return (
    <div className="container-fluid py-3 py-md-4">
      <div
        className="card"
        style={{ height: "calc(100vh - 140px)", minHeight: "500px" }}
      >
        <div className="row g-0 h-100">
          {/* Chat List - Hide on mobile when chat is selected */}
          <div
            className={`col-12 col-md-4 border-end ${!showChatList && selectedChat ? "d-none d-md-block" : ""}`}
          >
            <div className="p-3 border-bottom">
              <h5 className="mb-0">Messages</h5>
              <small className="text-muted">{chats.length} conversations</small>
            </div>

            {/* Search */}
            <div className="p-3 border-bottom">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search messages..."
                />
              </div>
            </div>

            {/* Chat List */}
            <div
              className="overflow-auto"
              style={{ height: "calc(100% - 130px)" }}
            >
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 border-bottom ${selectedChat?.id === chat.id ? "bg-light" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="d-flex align-items-start">
                    <div className="position-relative me-3">
                      <div
                        className="rounded-circle"
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundImage: `url(${chat.avatar})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {chat.isOnline && (
                        <span
                          className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                          style={{ width: "12px", height: "12px" }}
                        ></span>
                      )}
                    </div>
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
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div
            className={`col-12 col-md-8 d-flex flex-column ${showChatList && !selectedChat ? "d-none d-md-flex" : ""}`}
          >
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-3 border-bottom d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-link text-dark d-md-none me-2 p-0"
                    onClick={handleBackToList}
                  >
                    <i className="bi bi-arrow-left fs-5"></i>
                  </button>
                  <div
                    className="rounded-circle me-3"
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
                    <small className="text-muted">
                      {selectedChat.isOnline ? (
                        <>
                          <span className="text-success">●</span> Online
                        </>
                      ) : (
                        "Last seen recently"
                      )}
                    </small>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-link text-dark"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          View Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Clear Chat
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item text-danger" href="#">
                          Block User
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Messages Area */}
                <div
                  className="flex-grow-1 overflow-auto p-3"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`d-flex mb-3 ${msg.sender === "me" ? "justify-content-end" : ""}`}
                    >
                      <div
                        className={`p-3 rounded-3 ${
                          msg.sender === "me"
                            ? "bg-danger text-white"
                            : "bg-white"
                        }`}
                        style={{ maxWidth: "70%" }}
                      >
                        <p className="mb-1">{msg.text}</p>
                        <small
                          className={
                            msg.sender === "me" ? "text-white-50" : "text-muted"
                          }
                        >
                          {msg.time}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 border-top">
                  <form onSubmit={handleSendMessage}>
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        <i className="bi bi-paperclip"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        <i className="bi bi-emoji-smile"></i>
                      </button>
                      <button className="btn btn-danger" type="submit">
                        <i className="bi bi-send-fill"></i>
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
