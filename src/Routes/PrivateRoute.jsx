import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import SwappingDotLoader from "../Components/Loading/SwappingDotLoader";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
