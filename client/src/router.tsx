import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
    ],
  },
]);

export default router;
