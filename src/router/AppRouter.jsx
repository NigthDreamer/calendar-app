import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { CalendarRoutes } from '../calendar';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="auth" replace />,
  },
  AuthRoutes,
  CalendarRoutes,
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
