import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import useAuth from "../Hooks/useAuth";
import SwappingDotLoader from "../Components/Loading/SwappingDotLoader";
import LoadingSpinner from "../Components/Loading/LoadingSpinner";
const RootLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="bg-(--bg-soft-accent)">
      {/* Router And Layout setup Done */}
      <Navbar></Navbar>
      <div className="py-8"></div>
      <Outlet className="max-w-7xl mx-auto"></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
