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

  const accept = (activityId: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participation/accepted`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, activityId }),
    }).then(() => {
      setInvitations(
        invitations.filter((invitation) => invitation.id !== activityId),
      );
    });
  };

  const refuse = (activityId: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participation/refused`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, activityId }),
    }).then(() => {
      setInvitations(
        invitations.filter((invitation) => invitation.id !== activityId),
      );
    });
  };

  return (
    <section className="cards-activity">
      {invitations.map((activity) => (
        <article key={activity.id} className="invitation-card">
          <ActivityCard activity={activity} />
          <div className="invitation-actions">
            <button type="button" onClick={() => accept(activity.id)}>
              Accepter
            </button>
            <button type="button" onClick={() => refuse(activity.id)}>
              Refuser
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Invitations;
