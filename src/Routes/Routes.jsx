import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import AllTickets from "../Pages/AllTickets/AllTickets";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import AuthLayout from "../Layouts/AuthLayout";
import NotFound from "../Components/NotFound/NotFound";
import TicketDetailsPage from "../Pages/TicketDetailsPage/TicketDetailsPage";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import DasboardLayout from "../Layouts/DasboardLayout";
import UserProfile from "../Pages/Dashboard/UserProfile";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets";
import RequestedTickets from "../Pages/Dashboard/Vendor/RequestedTickets";
import Revenue from "../Pages/Dashboard/Vendor/Revenue";
import UpdateTicket from "../Pages/Dashboard/Vendor/UpdateTicket/UpdateTicket";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
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
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "/all-tickets/:id",
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
          // for user routes
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
          },
          // for admin routes
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>,
          },
          {
            path: "manage-tickets",
            element: <ManageTickets></ManageTickets>,
          },
          {
            path: "advertisement-tickets",
            element: <AdvertiseTickets></AdvertiseTickets>,
          },
          //for vendor routes
          {
            path: "add-tickets",
            element: <AddTicket></AddTicket>,
          },
          {
            path: "my-added-tickets",
            element: <MyAddedTickets></MyAddedTickets>,
          },
          {
            path: "requested-tickets",
            element: <RequestedTickets></RequestedTickets>,
          },
          {
            path: "revenue-overview",
            element: <Revenue></Revenue>,
          },
          {
            path: "update-ticket-details/:id",
            element: <UpdateTicket></UpdateTicket>,
          },
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
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
