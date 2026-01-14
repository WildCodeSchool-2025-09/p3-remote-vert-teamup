import { createBrowserRouter } from "react-router";
import App from "./App";
import Activity from "./pages/Activity";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/activities/page/:page",
        element: <Activity />,
      },
    ],
  },
]);

export default router;
