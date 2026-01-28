import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../styles/Activity.css";

function Invitations() {
  const [invitations, setInvitations] = useState<Activity[]>([]);
  const userId = 1;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participation?userId=${userId}`)
      .then((response) => response.json())
      .then((invitations) => setInvitations(invitations));
  }, []);

  return (
    <section className="cards-activity">
      {invitations.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </section>
  );
}

export default Invitations;
