import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AllTickets from "../Pages/AllTickets/AllTickets";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import NotFound from "../Components/NotFound/NotFound";
import TicketDetailsPage from "../Pages/TicketDetailsPage/TicketDetailsPage";;
import MyBookedTickets from "../Pages/Dashboard/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/TransactionHistory";
import DasboardLayout from "../Layouts/DasboardLayout";
import UserProfile from "../Pages/Dashboard/UserProfile";
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
        path: "*",
        Component: NotFound,
      },
      {
        path: "/dashboard",
        Component: DasboardLayout,
        children: [
          {
            index: true,
            Component: UserProfile,
          },
          {
            path: "my-booked-tickets",
            Component: MyBookedTickets,
          },
          {
            path: "transaction-history",
            Component: TransactionHistory,
          },
        {
          path: "user-profile",
          Component: UserProfile,
        }
        ],
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
