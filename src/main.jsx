import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Router, RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import { router } from "./Routes/Routes";
import SmoothScroll from "./Components/SmoothScroll/SmoothScroll";
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
           <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
