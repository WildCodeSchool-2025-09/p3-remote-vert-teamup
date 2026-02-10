import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";

type MessageType = {
  activity_id: number;
  content: string;
  created_at: Date;
  deleted_at: Date;
  id: number;
  updated_at: Date;
  user_id: number;
  username: string;
};

function GroupChat() {
  const location = useLocation();
  const activity = location.state.activity;
  const userId = location.state.userId; // Replace with login state
  const [typeMessage, setTypeMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const otherMessages = useMemo(() => {
    return messages.filter((m: MessageType) => m.user_id !== userId);
  }, [messages, userId]);

  const userMessages = useMemo(() => {
    return messages.filter((m: MessageType) => m.user_id === userId);
  }, [messages, userId]);

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

  return (
    <div className="chat-container">
      <div className="messages">
        <p>Group Chat for {activity.id}</p>
        <div className="user-messages">
          {userMessages.map((m) => (
            <div key={m.id}>
              <h3>{m.username}</h3>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
        <div className="other-messages">
          {otherMessages.map((m) => (
            <div key={m.id}>
              <h3>{m.username}</h3>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={typeMessage}
          onChange={(e) => {
            e.preventDefault();
            setTypeMessage(e.target.value);
          }}
        />
        <button type="button" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default GroupChat;
