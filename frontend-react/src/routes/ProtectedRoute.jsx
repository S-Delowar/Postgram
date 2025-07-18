import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const authData = JSON.parse(localStorage.getItem("auth"))
    const isAuthenticated = authData && authData.user;

    return isAuthenticated? <>{children}</> : <Navigate to="/login" />;

};

export default ProtectedRoute;