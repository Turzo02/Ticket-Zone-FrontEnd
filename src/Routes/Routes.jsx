import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AllTickets from "../Pages/AllTickets/AllTickets";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import NotFound from "../Components/NotFound/NotFound";
import TicketDetailsPage from "../Pages/TicketDetailsPage/TicketDetailsPage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-tickets",
        Component: AllTickets,
      },
      {
        path: "/all-tickets/details",
        Component: TicketDetailsPage,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
