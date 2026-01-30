import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ActivityCard from "../ActivityCard";

function Upcoming() {
  const [upcomingActivity, setUpcimingActivity] = useState<Activity[]>([]);
  const location = useLocation();
  const newParticipant = location.state?.newParticipant || {};

  const { userId, status } = newParticipant;

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(
      `${import.meta.env.VITE_API_URL}/api/activities?userId=${userId}&status=${status}`,
    )
      .then((res) => res.json())
      .then((activity) => setUpcimingActivity(activity.activities));
  }, [userId, status]);

  return (
    <div>
      <h1>A Venir</h1>
      {upcomingActivity.map((a) => (
        <ActivityCard key={a.id} activity={a} participantStatus={status} />
      ))}
    </div>
  );
}

export default Upcoming;
