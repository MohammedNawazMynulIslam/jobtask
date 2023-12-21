import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Root from "../Root/Root";
import About from "../components/pages/About";

import { Login } from "../components/pages/login";
import { Signup } from "../components/pages/Signup";
import { Dashboard } from "../components/pages/Dashboard";
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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
export default router;
