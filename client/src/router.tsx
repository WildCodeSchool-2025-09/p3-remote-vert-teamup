import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import MyActivities from "./pages/MyActivities.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/teamup/myActivity",
        element: <MyActivities />,
      },
    ],
  },
]);

export default router;
