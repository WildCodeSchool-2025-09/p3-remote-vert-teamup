import { Link, Outlet } from "react-router";
import "../../styles/MyActivities.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function MyActivity() {
  const [myActivities, setMyActivities] = useState({});

  const location = useLocation();

  const newParticipant = location.state ? location.state.newParticipant : {};

  console.log(newParticipant);

  // update activityRepository totalActivity cound to match global query.
  // add userId to the url via params
  //display activities according to their status

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/activities?userId=${newParticipant.userId}`,
    )
      .then((res) => res.json())
      .then((activities) => setMyActivities(activities));
  }, [newParticipant.userId]);

  console.log("Received From Back", myActivities);

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
