
import React from "react";
import { Navigate, useLocation} from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    let location = useLocation();
    if(!localStorage.getItem("loginEmail")){
      return <Navigate  to="/login" state={{ from: location }}  replace />;
    }
    return children;
};