'use client'

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const location = usePathname();
  
  // Check if user is authenticated
  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('adminAuth');
      if (!authData) return false;
      
      const { timestamp } = JSON.parse(authData);
      const now = new Date().getTime();
      const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      // Check if token is expired
      if (now - timestamp > expiryTime) {
        localStorage.removeItem('adminAuth');
        return false;
      }
      
      return true;
    } catch (error) {
      localStorage.removeItem('adminAuth');
      return false;
    }
  };

  const isAuthenticated = checkAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate href="/katib" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default AuthGuard;

