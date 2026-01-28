import { type ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps{
    children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute