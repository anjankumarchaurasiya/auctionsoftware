// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();  
    console.log('ProtectedRoute isAuthenticated:', isAuthenticated);  

    return isAuthenticated ? (
        <>{children}</>  
    ) : (
        <Navigate to="/" />  
    );
};

export default ProtectedRoute;
