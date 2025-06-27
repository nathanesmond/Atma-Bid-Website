import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/auth/user/HomePage";
import LoginUser from "../pages/auth/user/LoginUser";
import Profile from "../pages/ProfilePage";
import Payment from "../pages/PaymentPage";
import Upcoming from "../pages/UpcomingPage";
import Information from "../pages/InformationPage";
import Catalog from "../pages/CatalogPage";
import CarDetails from "../pages/DetailPage";
import MyBid from "../pages/MyBid";
import AddBid from "../pages/AddBid";
import ManageBids from "../pages/auth/admin/ManageBids";
import ManageUsers from "../pages/auth/admin/ManageUsers";
import AdminLoginLayout from "../layouts/AdminLoginLayout";
import AdminLogin from "../pages/auth/admin/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    // Main Layout: Halaman utama untuk user, kayak catalog, infomation, dll
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/information",
        element: <Information />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/detail/:id",
        element: <CarDetails />,
      },
      {
        path: "/add",
        element: <MyBid />,
      },
      {
        path: "/addBid",
        element: <AddBid />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "/login",
        element: <LoginUser />,
      },
    ],
  },
  {
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/managebids",
            element: <ManageBids />,
          },
          {
            path: "/admin/manageusers",
            element: <ManageUsers />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminLoginLayout />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
