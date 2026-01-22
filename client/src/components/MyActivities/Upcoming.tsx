import { useLocation } from "react-router";

export default function Upcoming() {
  const location = useLocation();
  const activity = location.state;

  console.log("Navigation state", activity);

  return (
    <>
      <h1>Upcoming</h1>
    </>
  );
}
