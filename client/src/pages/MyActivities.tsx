import { useState } from "react";
import ActivityTabs from "../components/ActivityTabs.tsx";
import "../styles/myActivity.css";
import MyActivitiesIncoming from "../components/MyActivitiesIncoming.tsx";

function MyActivities() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <>
      <h1>MES ACTIVITÉS</h1>
      <ActivityTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <section id="my-activities">
        {selectedTab === 0 && <MyActivitiesIncoming />}
      </section>
    </>
  );
}

export default MyActivities;
