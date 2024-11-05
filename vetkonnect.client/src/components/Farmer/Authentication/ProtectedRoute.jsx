import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/vetlogin" />}
        />
    );
};

export default ProtectedRoute;
