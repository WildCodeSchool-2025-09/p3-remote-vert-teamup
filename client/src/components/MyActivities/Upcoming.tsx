import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Upcoming() {
  const location = useLocation();
  const userId = location.state?.newParticipant?.userId;

  useEffect;

  console.log("Upcoming", userId);

  return (
    <>
      <h1>Upcoming</h1>
    </>
  );
}
