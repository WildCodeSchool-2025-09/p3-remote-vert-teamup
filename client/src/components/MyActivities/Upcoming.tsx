import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ActivityCard from "../ActivityCard";

function Upcoming() {
  const [upcomingActivity, setUpcimingActivity] = useState<Activity[]>([]);
  const location = useLocation();
  const newParticipant = location.state?.newParticipant || {};
  const { userId, status } = newParticipant;

  // Implement middlwhare to verify if the user is already enrolled to the activity.
  // Update reserve button functionality and waitlist mailing

  if (!newParticipant) {
    return <div>Aucune donnée de participation n'est disponible.</div>;
  }

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
      {upcomingActivity.map((a) => (
        <ActivityCard key={a.id} activity={a} />
      ))}
    </div>
  );
}

export default Upcoming;
