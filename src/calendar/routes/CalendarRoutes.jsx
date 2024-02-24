import { Outlet } from 'react-router-dom';
import { CalendarPage } from '../pages';
import { PrivateRoute } from '../../router/PrivateRoute';


export const CalendarRoutes = {
  path: '/',
  element: 
  <PrivateRoute>
    <Outlet />
  </PrivateRoute>,
  children: [
    {
      index: true,
      element: <CalendarPage/>
    },
  ],
};
