import { createBrowserRouter } from "react-router";
import App from "./App";
import Publication from "./pages/Publication";
import Activities from "./pages/Activities";

// TODO: Activer quand l'US Login sera faite (route /login + token)
// const requireAuth = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     return redirect("/login");
//   }
//   return null;
// };

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "publication",
        element: <Publication />,
        // loader: requireAuth, // TODO: activer après US Login
      },
      {
        path: "/activities/page/:page",
        element: <Activities />,
      },
    ],
  },
]);

export default router;
