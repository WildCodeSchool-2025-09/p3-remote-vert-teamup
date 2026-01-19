import { useEffect, useState } from "react";

function Publications() {
  const [activitiesPublicated, setActivitiesPublicated] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/publication`)
      .then((response) => response.json())
      .then((data) => setActivitiesPublicated(data));
  });

  console.log(activitiesPublicated);

  return (
    <>
      <h1>je suis publication</h1>
    </>
  );
}
export default Publications;
