import { useEffect, useState } from "react";
import "../styles/Messanger.css";
import { useNavigate } from "react-router";
import GroupChat from "./GroupChat";
import { formatMessageTime } from "../hooks/DataFormater";

type UsersActivities = {
  id: number;
  sport_name: string;
  city: string;
  playing_at: string;
};

const userId = 1; // replace with login state

function Messanger() {
  const navigate = useNavigate();
  const [userActivities, setUserActivities] = useState<
    UsersActivities[] | undefined
  >();
  const [selectedActivity, setSelectedActivity] = useState<UsersActivities>();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participations?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setUserActivities(data));
  }, []);

  const openChatroom = (a: UsersActivities) => {
    if (isMobile) {
      navigate(`/chat/${a.id}`, {
        state: { activity: a, userId: userId, isMobile: isMobile },
      });
    } else {
      setSelectedActivity(a);
    }
  };

  return (
    <>
      <div className="messanger-layout">
        <div className="chats-container">
          {userActivities?.length === 0 && (
            <h3>
              Vos messages apparaîtront ici une fois que vous vous serez inscrit
              à une activité.
            </h3>
          )}
          {userActivities?.map((a) => (
            <button
              type="button"
              key={a.id}
              className={`chat-wrapper ${a.id === selectedActivity?.id && "selected-chat"}`}
              onClick={() => openChatroom(a)}
            >
              <div className={`sport-img ${a.sport_name}`} />

              <div className="sub-chat-wrapper">
                <h2>{a.sport_name}</h2>
                <div className="sub-chat">
                  <p>{a.city}</p>
                  <p className="message-date">
                    {formatMessageTime(a.playing_at)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
        {!isMobile && (
          <div className="chat-panel">
            {selectedActivity ? (
              <GroupChat
                key={selectedActivity.id}
                activity={selectedActivity}
                userId={userId}
              />
            ) : (
              <div className="no-chat-selected">
                Sélectionnez une conversation
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Messanger;
