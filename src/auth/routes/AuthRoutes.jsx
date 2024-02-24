import { Navigate, Outlet } from 'react-router-dom';
import { LoginPage } from '../pages';

export const AuthRoutes = {
  path: 'auth',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Navigate to="login" replace />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
  ],
};
