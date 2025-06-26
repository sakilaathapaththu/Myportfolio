import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
