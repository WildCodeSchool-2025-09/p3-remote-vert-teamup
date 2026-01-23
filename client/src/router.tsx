import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";
import ActivitiesPublicated from "./pages/ActivitiesPublicated";
import ActivityForm from "./pages/ActivityForm";
import MyActivities from "./pages/MyActivities";

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
        path: "myactivities",
        element: <MyActivities />,
        children: [
          {
            path: "publications",
            element: <ActivitiesPublicated />,
          },
        ],
      },
    ],
  },
]);

export default router;
