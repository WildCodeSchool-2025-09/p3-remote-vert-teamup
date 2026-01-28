import "../../styles/MyActivities.css";
import { Link, Outlet } from "react-router";

function MyActivity() {
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
