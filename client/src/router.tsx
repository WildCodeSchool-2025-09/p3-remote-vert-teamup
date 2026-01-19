import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";
import Publications from "./pages/Publications";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
      {
        path: "/publication",
        element: <Publications />,
      },
    ],
  },
]);

export default router;
