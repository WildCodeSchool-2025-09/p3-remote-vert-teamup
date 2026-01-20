import { useState } from "react";
import SegmentedControl from "../components/SegmentedControl.tsx";
import "../styles/myActivity.css";
import { useApiGet } from "../services/get.ts";

function Activites() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const getUrlByTab = (tab: number) => {
    switch (tab) {
      case 0:
        return "http://localhost:3310/api/venir";
      case 1:
        return "http://localhost:3310/api/publiees";
      case 2:
        return "http://localhost:3310/api/attente";
      default:
        return "http://localhost:3310/api/venir";
    }
  };
  const { data, loading, error } = useApiGet(getUrlByTab(selectedTab));
  if (loading) return <p>Chargement…</p>;
  if (error) return <p>Erreur</p>;
  if (!data) return null;

  return (
    <main id="main-activites">
      <h1>MES ACTIVITÉS</h1>
      <SegmentedControl
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <section>
        <ul>
          {!loading &&
            !error &&
            data.map((activity) => (
              <li key={activity.id}>
                <div>{activity.description}</div>
                <div>
                  {activity.city} ({activity.zip_code})
                </div>
                <div>{activity.user_id}</div>
                <div>{activity.playing_at}</div>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Activites;
