import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";

function ActivitiesPublicated() {
  const [activitiesPublicated, setActivitiesPublicated] = useState<Activity[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/me/publications`)
      .then((response) => response.json())
      .then((activitiesPublicated) =>
        setActivitiesPublicated(activitiesPublicated),
      );
  }, []);

  return (
    <div className="cards-activity">
      {activitiesPublicated.map((activityPublicated) => (
        <ActivityCard
          activity={activityPublicated}
          key={activityPublicated.id}
        />
      ))}
    </div>
  );
}
export default ActivitiesPublicated;
