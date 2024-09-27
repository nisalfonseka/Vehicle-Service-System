import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  return < Navigate to="/dashboard" />;
};

export default PrivateRoute;
