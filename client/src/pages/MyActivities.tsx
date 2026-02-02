import { useEffect, useState } from "react";
import ActivityTabs from "../components/ActivityTabs.tsx";
import "../styles/myActivity.css";
import { useLocation, useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import ActivityCard from "../components/ActivityCard.tsx";

function MyActivities() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number>(0);
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

  let status = "";

  if (selectedTab === 0) {
    status = "incoming";
  } else if (selectedTab === 1) {
    status = "published";
  } else if (selectedTab === 2) {
    status = "pending";
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activities/me?status=${status}`)
      .then((response) => response.json())
      .then((myActivities) => setMyActivities(myActivities));
  }, [status]);

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
              status={status}
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
