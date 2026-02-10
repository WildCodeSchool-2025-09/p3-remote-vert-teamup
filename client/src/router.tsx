import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Activities from "./pages/Activities";
import ActivityForm from "./pages/ActivityForm";
import MyActivities from "./pages/MyActivities.tsx";
import Home from "./pages/Home.tsx";
import Messanger from "./components/Messanger.tsx";
import GroupChat from "./components/GroupChat.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
      },
      {
        path: "/messanger",
        element: <Messanger />,
      },
      {
        path: "/chat/:activityId",
        element: <GroupChat />,
      },
    ],
  },
]);

export default router;
