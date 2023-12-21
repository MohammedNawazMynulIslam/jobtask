import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Root from "../Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
export default router;
