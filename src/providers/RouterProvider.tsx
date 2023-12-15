import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

function Routes() {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: '/about',
      element: <div>About</div>,
    },
    {
      path: '/not-found',
      element: <NotFound />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/heroes',
          element: <div>Heroes</div>,
        },
        {
          path: '/monsters',
          element: <div>Monsters</div>,
        },
        {
          path: '/locations',
          element: <div>Locations</div>,
        },
        {
          path: '/treasure',
          element: <div>Treasure</div>,
        },
        {
          path: '/logout',
          element: <div>Logout</div>,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/login',
      element: <div>Login</div>,
    },
    {
      path: '/register',
      element: <div>Register</div>,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
