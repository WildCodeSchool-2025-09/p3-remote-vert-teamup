import { Outlet } from "react-router";

function MyActivities() {
  return (
    <>
      <h1>Mes Activités</h1>
      <Outlet />
    </>
  );
}

export default MyActivities;
