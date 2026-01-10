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
import PaymentSuccessPage from "../Pages/PaymentPage/PaymentSuccess/PaymentSuccessPage";
import PaymentFailedPage from "../Pages/PaymentPage/PaymentFailed/PaymentFailedPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import VendorRoute from "./VendorRoute";
import AboutUs from "../Pages/AdditionalPages/AboutUs";
import TermsCondition from "../Pages/AdditionalPages/TermsCondition";
import Guideline from "../Pages/AdditionalPages/Guideline";
import Privacy from "../Pages/AdditionalPages/Privacy";


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
        path: "/about-us",
        element: (
            <AboutUs></AboutUs>
        )
      },
      {
        path: "/terms-and-conditions",
        element: (
            <TermsCondition></TermsCondition>
        )
      },
      {
        path: "/guideline",
        element: (
           <Guideline></Guideline>
        )
      },
      {
        path: "/privacy-policy",
        element: (
           <Privacy></Privacy>
        )
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
        path: "/all-tickets/:id",
        element: (
          <PrivateRoute>
            <TicketDetailsPage></TicketDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccessPage></PaymentSuccessPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-failed",
        element: (
          <PrivateRoute>
            <PaymentFailedPage></PaymentFailedPage>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: NotFound,
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DasboardLayout></DasboardLayout>
          </PrivateRoute>
        ),
        children: [
          // for user routes
          {
            index: true,
            Component: UserProfile,
          },
          {
            path: "my-booked-tickets",
            element: <UserRoute><MyBookedTickets></MyBookedTickets></UserRoute>
          },
          {
            path: "transaction-history",
            element: <UserRoute><TransactionHistory></TransactionHistory></UserRoute>
          },
          {
            path: "user-profile",
            Component: UserProfile,
          },
          // for admin routes
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers></ManageUsers>,
              </AdminRoute>
            ),
          },
          {
            path: "manage-tickets",
            element: (
              <AdminRoute>
                <ManageTickets></ManageTickets>,
              </AdminRoute>
            ),
          },
          {
            path: "advertisement-tickets",
              element: (
                <AdminRoute>
                  <AdvertiseTickets></AdvertiseTickets>,
                </AdminRoute>
              ),
          },
          //for vendor routes
          {
            path: "add-tickets",
            element: (
              <VendorRoute>
                {" "}
                <AddTicket></AddTicket>{" "}
              </VendorRoute>
            ), 
          },
          {
            path: "my-added-tickets",
            element: (
              <VendorRoute>
                {" "}
                <MyAddedTickets></MyAddedTickets>{" "}
              </VendorRoute>
            ),
          },
          {
            path: "requested-tickets",
            element: (
              <VendorRoute>
                {" "}
                <RequestedTickets></RequestedTickets>{" "}
              </VendorRoute>
            )
          },
          {
            path: "revenue-overview",
                element: (
                  <VendorRoute>
                    {" "}
                    <Revenue></Revenue>{" "}
                  </VendorRoute>
                ),
          },
          {
            path: "update-ticket-details/:id",
              element: (
                <VendorRoute>
                  {" "}
                  <UpdateTicket></UpdateTicket>{" "}
                </VendorRoute>
              ),
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
