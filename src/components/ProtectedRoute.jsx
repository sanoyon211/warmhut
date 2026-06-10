import React from 'react';
import { Navigate } from 'react-router';
import { useSession } from '../lib/auth-client';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-olive/30 border-t-olive rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && session.user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (!adminOnly && session.user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
