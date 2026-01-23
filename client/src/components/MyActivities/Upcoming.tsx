import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Upcoming() {
  const location = useLocation();
  const newParticipant = location.state;

  console.log("Navigation state", newParticipant);

  useEffect(() => {}, []);

  return (
    <>
      <h1>Upcoming</h1>
    </>
  );
}
