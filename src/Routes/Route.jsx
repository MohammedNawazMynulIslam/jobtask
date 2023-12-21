import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Root from "../Root/Root";
import About from "../components/pages/About";
import { Service } from "../components/pages/Service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/service",
        element: <Service />,
      },
    ],
  },
]);
export default router;
