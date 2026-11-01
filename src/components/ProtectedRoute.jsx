import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect to the role's appropriate dashboard
    const target =
      currentUser.role === "admin"
        ? "/admin/dashboard"
        : currentUser.role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard";
    return <Navigate to={target} replace />;
  }

  return children;
};

export default ProtectedRoute;
