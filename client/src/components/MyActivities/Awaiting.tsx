import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ActivityCard from "../ActivityCard";

function Upcoming() {
  const [awaitingActivity, setAwaitingActivity] = useState<Activity[]>([]);
  const location = useLocation();
  const newParticipant = location.state?.newParticipant || {};

  const { userId } = newParticipant;

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/activities?userId=${userId}`)
      .then((res) => res.json())
      .then((data) =>
        setAwaitingActivity(
          data.activities.filter(
            (a: Activity) => a.user_participation_status !== "accepted",
          ),
        ),
      );
  }, [userId]);

  return (
    <div>
      <h1>En Attent</h1>
      {awaitingActivity.map((a) => (
        <ActivityCard
          key={a.id}
          activity={a}
          participantStatus={a.user_participation_status}
        />
      ))}
    </div>
  );
}

export default Upcoming;
