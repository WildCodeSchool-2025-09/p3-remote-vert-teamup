import { useEffect, useState } from "react";
import ActivityTabs from "../components/ActivityTabs.tsx";
import "../styles/myActivity.css";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import ActivityCard from "../components/ActivityCard.tsx";

function MyActivities() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>("incoming");
  const [myActivities, setMyActivities] = useState<Activity[]>([]);
  const [showParticpants, setShowParticipants] = useState<number | null>();

  useEffect(() => {
    if (location.state) {
      if (location.state !== undefined) {
        setSelectedTab(location.state);
      }

      if (location.state.toast) {
        toast.success(location.state.toast);
      }

      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/activities/me?status=${selectedTab}`,
    )
      .then((response) => response.json())
      .then((myActivities) => setMyActivities(myActivities));
  }, [selectedTab]);

  useEffect(() => {
    selectedTab && setShowParticipants(null);
  }, [selectedTab]);

  return (
    <>
      <div id="my-activities">
        <h1>Mes Activités</h1>
        <Toaster position="top-center" />

        <ActivityTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <section className="cards-myactivities">
          {myActivities.map((myActivity) => (
            <ActivityCard
              activity={myActivity}
              key={myActivity.id}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              participantsListIsOpen={showParticpants === myActivity.id}
              onClickListParticipant={() =>
                setShowParticipants(
                  showParticpants === myActivity.id ? null : myActivity.id,
                )
              }
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default MyActivities;
