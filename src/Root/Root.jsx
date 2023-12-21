import Footer from "../components/pages/Footer";
import Navbar from "../components/pages/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
