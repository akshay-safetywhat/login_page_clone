import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const access = localStorage.getItem('access');
//   console.log('AccessToken in ProtectedRoute:', access);

  if (!access) {
    console.log('No access token, redirecting to /login');
    return <Navigate to="/login" />;
  }

  console.log('Access token found, rendering protected route');
  return children;
};

export default ProtectedRoute;
