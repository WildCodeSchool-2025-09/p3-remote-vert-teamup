import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Activity } from "../types/Activity";

type ActivityContextType = {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

const ActivityContext = createContext<ActivityContextType>({
  activities: [],
  setActivities: () => {},
});

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/activities`)
      .then((response) => response.json())
      .then((activities) => setActivities(activities));
  }, []);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivity = () => {
  return useContext(ActivityContext);
};
