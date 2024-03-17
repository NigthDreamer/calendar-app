import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

//Al poner el children, definimos este componente como un higher order component
// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return status === 'authenticated' ? (
    children
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};
