import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ paths, redirectTo, ...props }) => {
  const { isAuthenticated } = useAuth();

  // Check if the current path is allowed
  const isAllowed = paths ? paths.some(path => window.location.pathname.startsWith(path)) : true;

  return isAllowed && isAuthenticated() ? <Outlet {...props} /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;