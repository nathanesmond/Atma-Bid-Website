import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../api/authService";
import { toast } from "react-toastify";

const ProtectedAdminRoute = ({ role }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!authService.isAdmin) {
    toast.error("Anda bukan admin!");
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
