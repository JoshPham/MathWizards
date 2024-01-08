import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, paths, redirectTo, ...props }) => {
  const { isAuthenticated } = useAuth();

  // Check if the current path is allowed
  const isAllowed = paths ? paths.some(path => window.location.pathname.startsWith(path)) : true;

  return isAllowed && isAuthenticated() ? <Component {...props} /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;