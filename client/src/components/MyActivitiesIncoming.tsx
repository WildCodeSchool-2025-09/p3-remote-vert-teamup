import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";

function MyActivitiesIncoming() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/activities/me?status=incoming")
      .then((res) => res.json())
      .then((activities) => setActivities(activities))
      .catch((error) => setError(error));
  }, []);

  return (
    <>
      {!error && activities ? (
        <ul>
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </ul>
      ) : (
        <p>Un problème est survenu</p>
      )}
    </>
  );
}

export default MyActivitiesIncoming;
