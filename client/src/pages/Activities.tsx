import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../styles/Activity.css";
import { useNavigate, useParams } from "react-router";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

function Activities() {
  const { page } = useParams();
  const currentPage = Math.max(1, Number(page) || 1);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [filters, setFilters] = useState({
    sport: "",
    playingAt: "",
    city: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!filters.sport && !filters.city && !filters.playingAt) return;
    navigate("/activities/page/1");
  }, [filters, navigate]);

  useEffect(() => {
    const LIMIT = 10;

    const queryString = new URLSearchParams({
      filters: JSON.stringify(filters),
    }).toString();

    fetch(
      `${import.meta.env.VITE_API_URL}/api/activities?page=${currentPage}&limit=${LIMIT}&${queryString}`,
    )
      .then((response) => response.json())
      .then((activities) => {
        setActivities(activities.activities);
        setTotalPages(activities.pagination.totalPages);
        setTotalActivities(activities.pagination.totalActivities);
      });
  }, [currentPage, filters]);

  return (
    <>
      <section className="flx-activitypg">
        <div className="activities-container">
          <SearchBar setFilters={setFilters} />
          <div className="header-activity">
            <h1>Activités disponibles</h1>
            {totalActivities === 0 ? (
              <p>Aucun résultat</p>
            ) : totalActivities < 2 ? (
              <p>{totalActivities} résultat</p>
            ) : (
              <p>{totalActivities} résultats</p>
            )}
          </div>
          <section className="cards-activity">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </section>
        </div>
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default Activities;
