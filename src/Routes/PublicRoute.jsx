import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import SwippingDotLoader from  "../Components/Loading/SwappingDotLoader"

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SwippingDotLoader></SwippingDotLoader>;
  }

  // logged in user access korte parbe na
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
