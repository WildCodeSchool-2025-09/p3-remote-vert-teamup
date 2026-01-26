import "../../styles/MyActivities.css";
import { Link, Outlet } from "react-router";
// import { useEffect } from "react";
// import { useNavigate, useLocation } from "react-router";

function MyActivity() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const userId = location.state?.newParticipant?.userId;

  // useEffect(() => {
  //   if (!userId) return;

  //   fetch(`${import.meta.env.VITE_API_URL}/api/activities?userId=${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const acceptedActivities = data.activities.filter(
  //         (e) => e.status === "accepted",
  //       );
  //       const awaitingActivities = data.activities.filter(
  //         (e) => e.status !== "accepted",
  //       );

  //       console.log("acivities:", data);

  //       const userActivities =
  //         acceptedActivities.length > 0
  //           ? {
  //               navigUrl: "/myactivity/upcoming",
  //               userActivities: acceptedActivities,
  //             }
  //           : {
  //               navigUrl: "/myactivity/awaiting",
  //               userActivities: awaitingActivities,
  //             };

  //       console.log(userActivities);

  //       navigate(userActivities.navigUrl, {
  //         state: {
  //           userActivities,
  //         },
  //       });
  //     });
  // }, [userId, navigate]);

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
