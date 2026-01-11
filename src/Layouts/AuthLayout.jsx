import React from "react";
import { Outlet } from "react-router";
import { useTheme } from "../Context/ThemeToggle/useTheme";

const AuthLayout = () => {
  const [theme] = useTheme();

  return (
    <div className=" mx-auto">
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;

