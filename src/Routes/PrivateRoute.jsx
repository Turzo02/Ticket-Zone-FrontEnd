import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import SwappingDotLoader from "../Components/Loading/SwappingDotLoader";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <SwappingDotLoader></SwappingDotLoader>;
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
