import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../styles/Activity.css";
import { useParams } from "react-router";
import Pagination from "../components/Pagination";

function Activities() {
  const { page } = useParams();
  const currentPage = Math.max(1, Number(page) || 1);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const LIMIT = 10;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/activities?page=${currentPage}&limit=${LIMIT}`,
    )
      .then((response) => response.json())
      .then((activities) => {
        setActivities(activities.activities);
        setTotalPages(activities.pagination.totalPages);
      });
  }, [currentPage]);

  return (
    <>
      <h1>Activités disponibles</h1>
      <section className="cards-activity">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default Activities;
