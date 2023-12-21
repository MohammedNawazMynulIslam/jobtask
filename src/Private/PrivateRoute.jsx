import { AuthContext } from "../Auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import { useContext } from "react";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Lottie animationData={loadingAnimation}></Lottie>;
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/"></Navigate>;
};
