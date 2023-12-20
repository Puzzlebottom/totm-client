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

interface Route {
  path: string;
  element: JSX.Element;
}

interface RouteWrapper {
  path: string;
  element: JSX.Element;
  children: Route[];
}

export const routesForPublic: Route[] = [
  {
    path: '/about',
    element: <h1>About</h1>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const routesForAuthenticatedOnly: RouteWrapper[] = [
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
        element: <h1>Heroes</h1>,
      },
      {
        path: '/monsters',
        element: <h1>Monsters</h1>,
      },
      {
        path: '/locations',
        element: <h1>Locations</h1>,
      },
      {
        path: '/treasure',
        element: <h1>Treasure</h1>,
      },
      {
        path: '/logout',
        element: <h1>Logout</h1>,
      },
    ],
  },
];

export const routesForNotAuthenticatedOnly = [
  {
    path: '/login',
    element: <h1>Login</h1>,
  },
  {
    path: '/register',
    element: <h1>Register</h1>,
  },
];

function Routes() {
  const { token } = useAuth();

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
