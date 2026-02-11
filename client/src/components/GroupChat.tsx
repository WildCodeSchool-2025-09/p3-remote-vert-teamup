import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { format, isToday, isYesterday } from "date-fns";

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

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString.replace(" ", "T"));

    const time = format(date, "HH:mm");

    if (isToday(date)) return `aujourd'hui a ${time}`;
    if (isYesterday(date)) return `Hier à ${time}`;

    return format(date, "dd MMM 'à' HH:mm");
  };

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

  console.log(messages);

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
          <div
            key={m.id}
            className={`${m.user_id === userId ? "chat-right" : "chat-left"}`}
          >
            <div
              className={` single-message ${m.user_id === userId && "userrow-reverse"}`}
            >
              <h3
                className={`username ${m.user_id === userId && "username-none"}`}
              >
                {m.username}
              </h3>
              <p>{m.content}</p>
              <small className="message-date">
                {formatMessageTime(m.created_at)}
              </small>
            </div>
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
        <button type="button" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default GroupChat;
