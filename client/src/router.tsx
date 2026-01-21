import { createBrowserRouter } from "react-router";
import App from "./App";
import Awaiting from "./components/MyActivities/Awaiting";
import MyActivity from "./components/MyActivities/MyActivities";
import Published from "./components/MyActivities/Published";
import Upcoming from "./components/MyActivities/Upcoming";
import Activities from "./pages/Activities";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
      {
        path: "/myactivity/",
        element: <MyActivity />,
        children: [
          {
            path: "upcoming",
            element: <Upcoming />,
          },
          {
            path: "published",
            element: <Published />,
          },
          {
            path: "awaiting",
            element: <Awaiting />,
          },
        ],
      },
    ],
  },
]);

export default router;
