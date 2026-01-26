import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";
import ActivityForm from "./pages/ActivityForm";
import MyActivities from "./pages/MyActivities";
import MyActivitiesPublished from "./pages/MyActivitiesPublished";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/publication",
        element: <ActivityForm />,
      },
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
      {
        path: "/my-activities",
        element: <MyActivities />,
        children: [
          {
            path: "published",
            element: <MyActivitiesPublished />,
          },
        ],
      },
    ],
  },
]);

export default router;
