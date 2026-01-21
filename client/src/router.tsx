import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Activities from "./pages/Activities";
import MyActivities from "./pages/MyActivities.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/teamup/myActivity",
        element: <MyActivities />,
      },
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
    ],
  },
]);

export default router;
