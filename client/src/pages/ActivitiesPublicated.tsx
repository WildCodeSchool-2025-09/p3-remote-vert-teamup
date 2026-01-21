import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../styles/ActivitiesPublicated.css";

function ActivitiesPublicated() {
  const [activitiesPublicated, setActivitiesPublicated] = useState<Activity[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/publications`)
      .then((response) => response.json())
      .then((activities) => setActivitiesPublicated(activities));
  }, []);

  return (
    <div className="cards-activities-publicated">
      {activitiesPublicated.map((activityPublicated) => (
        <ActivityCard
          activity={activityPublicated}
          key={activityPublicated.id}
          publicatedRoad={true}
        />
      ))}
    </div>
  );
}
export default ActivitiesPublicated;
