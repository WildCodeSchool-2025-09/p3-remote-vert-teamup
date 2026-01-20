import { createBrowserRouter } from "react-router";
import App from "./App";
import Activities from "./pages/Activities";
import Publication from "./pages/Publication";

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
        element: <Publication />,
      },
    ],
  },
]);

export default router;
