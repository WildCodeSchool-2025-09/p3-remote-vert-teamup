import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Activities from "./pages/Activities";
import ActivityForm from "./pages/ActivityForm";
import Invitations from "./pages/Invitations";
import MyActivities from "./pages/MyActivities.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/my-activities",
        element: <MyActivities />,
      },
      {
        path: "publication",
        element: <ActivityForm />,
      },
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
      {
        path: "/myactivities/invitations",
        element: <Invitations />,
      },
    ],
  },
]);

export default router;
