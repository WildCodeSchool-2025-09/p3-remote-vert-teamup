import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";

function MyActivitiesIncoming() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/activities/me?status=refused")
      .then((res) => res.json())
      .then((activities) => setActivities(activities))
      .catch((error) => setError(error));
  }, []);

  return (
    <>
      {!error && activities ? (
        <div className="cards-activity">
          {activities.map((activity) => (
            <ActivityCard activity={activity} key={activity.id} />
          ))}
        </div>
      ) : (
        <p>Un problème est survenu</p>
      )}
    </>
  );
}

export default MyActivitiesIncoming;
