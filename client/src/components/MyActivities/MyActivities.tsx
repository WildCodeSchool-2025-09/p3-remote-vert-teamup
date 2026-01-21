import { Link, Outlet } from "react-router";
import "./MyActivities.css";

function MyActivity() {
  return (
    <>
      <section className="myact-navigation">
        <Link to="/myactivity/upcoming">A venir</Link>
        <Link to="/myactivity/published">Publier</Link>
        <Link to="/myactivity/awaiting">En Attent</Link>
      </section>
      <Outlet />
    </>
  );
}

export default MyActivity;
