import React from "react";
import { createBrowserRouter } from "react-router-dom";

/* Layout */
import MainLayout from "../components/Layout/MainLayout";

/* Public pages */
import Home from "../components/Home/Home";
import Login from "../components/Pages/Login";
import ForgetPassword from "../components/Pages/ForgetPassword";
import ResetPassword from "../components/Pages/ResetPassword";
import Signup from "../components/Pages/Signup";
import About from "../components/About/About";
import Contact from "../Contact/Contact";
import User from "../components/User/User";
import Getstarted from "../components/Getstarted/Header/Header";

/* Admin */
import AdminRoute from "../components/Protected/AdminRoute";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminHome from "../components/Admin/AdminHome";
import AdminBookings from "../components/Admin/AdminBookings";
import AdminUsers from "../components/Admin/AdminUsers";
import PaymentPage from "../components/Payment/PaymentPage";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import BookingPage from "../components/Booking/BookingPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "loginpriya", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password/:resetToken", element: <ResetPassword /> },
      { path: "sign-up", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "user/:userid", element: <User /> },
      { path: "getstarted", element: <Getstarted /> },
      { path: "book", element: <BookingPage /> },

      // 🔐 Admin Routes
      {
        path: "admin",
        element: <AdminRoute />, // guard only
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />, // layout for admin dashboard
            children: [
              { index: true, element: <AdminHome /> },
              { path: "bookings", element: <AdminBookings /> },
              { path: "users", element: <AdminUsers /> },
            ],
          },
        ],
      },

      { path: "payment/:bookingId", element: <PaymentPage /> },
      { path: "payment-success/:bookingId", element: <PaymentSuccess /> },
    ],
  },
]);

export default Router;
