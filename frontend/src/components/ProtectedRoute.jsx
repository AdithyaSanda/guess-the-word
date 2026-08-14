import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, allowedRole}) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token) {
        return <Navigate to="/" replace/>;
    }

    if(allowedRole && role !== allowedRole) {
        if(role === "ADMIN") {
            return <Navigate to="/admin" replace/>;
        }
        
        if(role === "PLAYER") {
            return <Navigate to="/player" replace/>;
        }

        localStorage.clear();

        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute