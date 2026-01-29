import { useState } from "react";
import ActivityTabs from "../components/ActivityTabs.tsx";
import "../styles/myActivity.css";
import MyActivitiesIncoming from "../components/MyActivitiesIncoming.tsx";

function MyActivities() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <>
      <div id="my-activities">
        <h1>Mes Activités</h1>
        <ActivityTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <section>{selectedTab === 0 && <MyActivitiesIncoming />}</section>
      </div>
    </>
  );
}

export default MyActivities;
