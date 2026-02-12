import { useState, useEffect } from "react";
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
          </div>
        ))}
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
        <button
          type="button"
          className="send-message"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default GroupChat;
