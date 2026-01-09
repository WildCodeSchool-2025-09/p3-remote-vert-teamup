import CardActivity from "../components/CardActivity";
import { useActivity } from "../context/ActivityContext";
import "../styles/Activity.css";

function Activity() {
  const { activities } = useActivity();

  return (
    <>
      <h1>Activités disponibles</h1>
      <section className="cards-activity">
        {activities.map((activity) => (
          <CardActivity key={activity.id} activity={activity} />
        ))}
      </section>
    </>
  );
}

export default Activity;
