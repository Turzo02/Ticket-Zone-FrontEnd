import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import useAuth from "../Hooks/useAuth";
import SwappingDotLoader from "../Components/Loading/SwappingDotLoader";
const RootLayout = () => {
  const { loading } = useAuth();
  if (loading) {
    return <SwappingDotLoader></SwappingDotLoader>;
  }
  return (
    <div >
      {/* Router And Layout setup Done */}
      <Navbar></Navbar>
      <Outlet className="max-w-7xl mx-auto"></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
