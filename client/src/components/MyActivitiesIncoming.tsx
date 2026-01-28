import { useEffect, useState } from "react";

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
      {!error && activities && (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <div>{activity.description}</div>
              <div>
                {activity.city} ({activity.zip_code})
              </div>
              <div>{activity.user_id}</div>
              <div>{activity.playing_at}</div>
            </li>
          ))}
        </ul>
      )}
      : <p>Un problème est survenu</p>
    </>
  );
}

export default MyActivitiesIncoming;
