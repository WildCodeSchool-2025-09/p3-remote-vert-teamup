import { Link, Outlet } from "react-router";
import "../../styles/MyActivities.css";
import { useEffect, useState } from "react";

function MyActivity() {
  const [myActivities, setMyActivities] = useState({});

  // Backend query added, p.status and query (Where user_id = ?)
  // fetch writen, have to recover userId from ActivityCard by navigate.

  console.log(myActivities);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activity`)
      .then((res) => res.json())
      .then((activities) => setMyActivities(activities));
  }, []);

  return (
    <>
      <section className="section-myact">
        <div className="container-myact">
          <h1 className="title-mc">Mes Activités</h1>
          <div className="navigation-myact">
            <Link to="/myactivity/upcoming">A venir</Link>
            <Link to="/myactivity/published">Publier</Link>
            <Link to="/myactivity/awaiting">En Attent</Link>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}

export default MyActivity;
