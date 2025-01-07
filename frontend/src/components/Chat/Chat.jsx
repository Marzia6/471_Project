import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessageContent, setEditMessageContent] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("userId");

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        // console.log(response);
        if (response.ok) {
          const users = await response.json();
          const names = users.reduce((acc, user) => {
            acc[user._id] = user.name;
            return acc;
          }, {});
          setUserNames(names);
        } else {
          console.error("Failed to fetch user names");
        }
      } catch (error) {
        console.error("Error fetching user names:", error);
      }
    };

    fetchUserNames();
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully!");
      newSocket.emit("join", uid);
    });

    newSocket.on("connect_error", (err) => {
      console.error(`Connection error: ${err.message}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [uid]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/getmessages/${uid}/${id}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const messages = await response.json();
        setData(messages);
      } else {
        console.error("Failed to load messages.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [uid, id]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMsg", (incomingData) => {
      console.log("Received message:", incomingData);
      setData((prevData) => [...prevData, incomingData]);
    });

    return () => {
      socket.off("newMsg");
    };
  }, [socket]);

  const sendMsg = async () => {
    if (!socket) {
      console.error("Socket not initialized");
      return;
    }
    const message = { content: text, sender: uid, receiver: id };

    setData((prevData) => [...prevData, message]);

    try {
      const response = await fetch(
        `http://localhost:5000/sendmsg/${uid}/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (response.ok) {
        socket.emit("privateMsg", message);
        setText("");

        const messages = await response.json();
        setData(messages);
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateMessage = async (messageId) => {
    if (!editMessageContent.trim()) {
      console.error("Message content cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/updatemsg", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: messageId,
          content: editMessageContent.trim(),
        }),
      });

      if (response.ok) {
        setEditMessageId(null);
        setEditMessageContent("");
        setData((prevData) =>
          prevData.map((msg) =>
            msg._id === messageId
              ? { ...msg, content: editMessageContent.trim() }
              : msg
          )
        );
      } else {
        console.error("Failed to update message.");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!messageId) {
      console.error("No message ID provided for deletion.");
      return;
    }

    setData((prevData) => prevData.filter((msg) => msg._id !== messageId));

    try {
      const response = await fetch("http://localhost:5000/deletemsg", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageId }),
      });

      if (!response.ok) {
        console.error("Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center text-2xl font-semibold">
        Chat with {userNames[id] || "Loading..."}
      </header>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold mb-2">Messages:</h2>
          <div className="space-y-2">
            {data.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === uid
                    ? "bg-blue-200 text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                <span className="font-medium">
                  {userNames[msg.sender] || "Loading..."}
                </span>
                {editMessageId === msg._id ? (
                  <div>
                    <input
                      type="text"
                      value={editMessageContent}
                      onChange={(e) => setEditMessageContent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => updateMessage(msg._id)}
                      className="bg-green-500 text-white p-2 mt-2 rounded"
                    >
                      Update
                    </button>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}

                {msg.sender === uid && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditMessageId(msg._id);
                        setEditMessageContent(msg.content);
                      }}
                      className="text-white p-2 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="text-white p-2 rounded"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="p-4 bg-gray-200">
        <div className="max-w-3xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMsg}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
