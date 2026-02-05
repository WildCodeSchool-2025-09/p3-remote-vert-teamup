import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import "../styles/Activity.css";
import { useNavigate, useParams } from "react-router";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SearchFilters from "../components/SearchFilters";
import { useMediaQuery } from "react-responsive";

const LIMIT = 10;
const userId = 1; // Replace userId with context loged in variable

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

  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  useEffect(() => {
    if (!filters.sport && !filters.city && !filters.playingAt) return;
    navigate("/activities/page/1");
  }, [filters, navigate]);

  useEffect(() => {
    const fetchAndFilterActivities = async () => {
      let enrolledActivityIds: number[] = [];

      if (userId) {
        const enrollmentsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/participations?userId=${userId}`,
        );
        enrolledActivityIds = await enrollmentsResponse.json();
      }

      const queryString = new URLSearchParams({
        filters: JSON.stringify(filters),
      }).toString();

      const activitiesResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/activities?page=${currentPage}&limit=${LIMIT}&${queryString}`,
      );

      const activitiesData = await activitiesResponse.json();

      const filteredActivities = userId
        ? activitiesData.activities.filter(
            (a: Activity) => !enrolledActivityIds.includes(a.id),
          )
        : activitiesData.activities;

      setActivities(filteredActivities);
      setTotalPages(activitiesData.pagination.totalPages);
      setTotalActivities(activitiesData.pagination.totalActivities);
    };

    fetchAndFilterActivities();
  }, [currentPage, filters]);

  return (
    <>
      {!isMobile && <p className="tagline">Que recherchez-vous ?</p>}
      <section className="page-activities">
        <div className="activities-container">
          <SearchBar setFilters={setFilters} />
          <div className="header-activity">
            <h1>Activités disponibles</h1>
            {totalActivities === 0 ? (
              ""
            ) : totalActivities < 2 ? (
              <p>{totalActivities} résultat</p>
            ) : (
              <p>{totalActivities} résultats</p>
            )}
          </div>
          <section className="cards-activity">
            {totalActivities ? (
              activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))
            ) : (
              <p>Aucun résultat</p>
            )}
          </section>
        </div>
        {!isMobile && (
          <div className="filters-desktop">
            <SearchFilters setFilters={setFilters} />
          </div>
        )}
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default Activities;
