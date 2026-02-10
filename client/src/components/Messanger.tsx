import { useEffect, useState } from "react";
import "../styles/Messanger.css";
import { useNavigate } from "react-router";

type UsersActivities = {
  id: number;
  sport_name: string;
  city: string;
  playing_at: string;
};

const userId = 9; // replace with login state

function Messanger() {
  const navigate = useNavigate();
  const [userActivities, setUserActivities] = useState<
    UsersActivities[] | undefined
  >();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participations?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setUserActivities(data));
  }, []);

  console.log(userActivities);

  return (
    <div className="chats-container">
      {userActivities?.length === 0 && (
        <h1>
          Vos messages apparaîtront ici une fois que vous vous serez inscrit à
          une activité.
        </h1>
      )}
      {userActivities?.map((a) => (
        <button
          type="button"
          key={a.id}
          className="chat-wrapper"
          onClick={() =>
            navigate(`/chat/${a.id}`, {
              state: { activity: a, userId: userId },
            })
          }
        >
          <h2>{a.sport_name}</h2>
          <p>{a.city}</p>
          <p>{a.playing_at}</p>
        </button>
      ))}
    </div>
  );
}

export default Messanger;
