import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(token && role === "ADMIN") {
        return <Navigate to="/admin" replace/>;
    }

    if(token && role === "PLAYER") {
        return <Navigate to="/player" replace/>;
    }

    return children;
}

export default PublicRoute