import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";
import ActivityForm from "./pages/ActivityForm";
import Invitations from "./pages/Invitations";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
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
