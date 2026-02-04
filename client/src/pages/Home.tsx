import { Link } from "react-router";
import ActivityCard from "../components/ActivityCard";
import Carousel from "../components/Carousel";
import "../styles/Home.css";
import { useEffect, useState } from "react";

const LIMIT = 5;

function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activities?limit=${LIMIT}`)
      .then((response) => response.json())
      .then((activities) => setActivities(activities.activities));
  }, []);

  return (
    <section className="homepage">
      <h1 className="homepage-title">TeamUp</h1>
      <article className="homepage-article">
        <p>
          Envie de bouger, mais pas seul ? <br />
          TeamUp te permet de créer ou rejoindre des activités sportives avec
          des personnes qui partagent la même motivation.
          <br />
          Trouve ton équipe. Passe à l’action.
        </p>
      </article>
      <div className="homepage-button-wrapper">
        <Link to="/activities/page/1">
          <button type="button">
            <img src="/icons/search.png" alt="search" />
            Explore
          </button>
        </Link>
        <Link to="/publication">
          <button type="button">
            <img src="/icons/add.png" alt="add" />
            Crée
          </button>
        </Link>
      </div>
      <h2 className="homepage-subtitle">Comment ça marche ?</h2>
      <article className="homepage-article">
        <p>
          🔎 Cherche une activité (sport, lieu, date, niveau).
          <br />🤝 Rejoins un groupe ou crée le tien.
          <br />🏅 Fais du sport avec des gens motivés.
        </p>
      </article>
      <h2 className="homepage-subtitle">Pourquoi utiliser TeamUp ?</h2>
      <article className="homepage-article">
        <p>
          ✅ Activités adaptées à ton niveau.
          <br /> ✅ Sport quand tu veux, où tu veux.
          <br />✅ Rencontre de nouvelles personnes.
          <br />✅ Pas besoin d’être inscrit dans un club.
        </p>
      </article>
      <div className="homepage-subtitle-wrapper">
        <h2 className="homepage-subtitle">Proposition d'activités</h2>
        <Link to="/activities/page/1">
          <p>voir plus</p>
        </Link>
      </div>
      <Carousel
        activities={activities}
        renderActivity={(activity) => <ActivityCard activity={activity} />}
      />
    </section>
  );
}
export default Home;
