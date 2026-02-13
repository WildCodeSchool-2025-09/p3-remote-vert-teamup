import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { formatMessageTime } from "../hooks/DataFormater";

type groupChatType = {
  activity: {
    id: number;
    sport_name: string;
    city: string;
    playing_at: string;
  };
  userId: number;
};

type MessageType = {
  activity_id: number;
  content: string;
  created_at: string;
  deleted_at: string;
  id: number;
  updated_at: string;
  user_id: number;
  username: string;
};

function GroupChat({
  activity: activityProp,
  userId: userIdProp,
}: groupChatType) {
  const location = useLocation();

  const activity = activityProp ?? location.state?.activity;
  const userId = userIdProp ?? location.state?.userId; // Replace with login state

  const [typeMessage, setTypeMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const shouldPoll = useRef(true);
  const isPollingRef = useRef(false);
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  // }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/message?userId=${userId}&activityId=${activity.id}`,
        );

        if (!res.ok) throw new Error("Fetch failed");

        setMessages(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    getMessages();
  }, [userId, activity.id]);

  useEffect(() => {
    if (isPollingRef.current) {
      return;
    }

    isPollingRef.current = true;
    shouldPoll.current = true;
    startPolling();

    return () => {
      shouldPoll.current = false;
    };
  }, []);

  const startPolling = async () => {
    if (!shouldPoll.current) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/message/poll?activityId=${activity.id}`,
      );

      if (!response.ok) throw new Error("Poll request failed");

      const data = await response.json();

      if (data.messages && data.messages.length > 0) {
        setMessages((prev) => [...prev, ...data.messages]);
      }
    } catch (err) {
      console.error("Error polling:", err);
    }
    setTimeout(startPolling, 1000);
  };

  const sendMessage = async () => {
    if (typeMessage.length === 0) {
      // Tell user the content cannot be 0
      alert("Message body is 0");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: typeMessage,
            userId,
            activityId: activity.id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send a message");
      }

      setTypeMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const addLike = async (m: MessageType) => {
    console.log(m);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/message/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messageId: m.id,
            userId: userId,
          }),
        },
      );

      const likeStatus = await res.json();

      console.log(
        "THIS IS WHAT WE GET AS AFFECTED ROWS",
        likeStatus.affectedRows,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-room">
      <p>Group Chat for {activity.id}</p>
      <div className="messages-display">
        {messages.map((m) => (
          <div key={m.id} className="single-message">
            <div className="user-date">
              <h3
                className={`username ${m.user_id === userId && "my-username"}`}
              >
                {m.username}
              </h3>
              <small className="message-date">
                {formatMessageTime(m.created_at)}
              </small>
            </div>
            <p>{m.content}</p>
            <button
              type="button"
              className="like-btn"
              onClick={() => addLike(m)}
            >
              <img src="../../public/icons/thumbs-up.svg" alt="Like" />
            </button>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <textarea
          // ref={messagesEndRef}
          className="chat-input"
          value={typeMessage}
          placeholder="Message"
          onChange={(e) => {
            e.preventDefault();
            setTypeMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}

export default GroupChat;
