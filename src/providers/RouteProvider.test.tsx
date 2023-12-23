/* eslint-disable react/jsx-props-no-spreading */
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AuthProvider, { useAuth } from './AuthProvider';
import Routes, {
  routesForPublic,
  routesForAuthenticatedOnly,
  routesForNotAuthenticatedOnly,
} from './RouterProvider';
import GraphQLProvider from './GraphQLProvider';

vi.mock('./AuthProvider');

function MockRouterProvider({ route }: { route: string }) {
  const { token } = useAuth();

  const router = createMemoryRouter(
    [
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ],
    { initialEntries: [route] }
  );

  return <RouterProvider router={router} />;
}

function WrappedRouterProvider({
  tokenValue,
  routePath,
}: {
  tokenValue: string | null;
  routePath: string;
}) {
  const authProps = { testValue: tokenValue };
  const pathProps = { route: routePath };

  return (
    <AuthProvider {...authProps}>
      <GraphQLProvider>
        <MockRouterProvider {...pathProps} />
      </GraphQLProvider>
    </AuthProvider>
  );
}

describe('RouteProvider', () => {
  it('redirects to /login when no authToken is provided', async () => {
    render(<WrappedRouterProvider tokenValue={null} routePath="/" />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('navigates to public routes with or without an authToken', () => {
    render(<WrappedRouterProvider tokenValue={null} routePath="/about" />);
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    cleanup();

    render(<WrappedRouterProvider tokenValue="TestToken" routePath="/about" />);
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    cleanup();
  });

  it('renders the Not Found component if provided a bad route', () => {
    render(<WrappedRouterProvider tokenValue={null} routePath="/bad/route" />);
    expect(
      screen.getByRole('heading', { name: 'Not Found' })
    ).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/bad/route" />
    );
    expect(
      screen.getByRole('heading', { name: 'Not Found' })
    ).toBeInTheDocument();
    cleanup();
  });

  it('navigates to authenticated-only routes only with an authToken', () => {
    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/heroes" />
    );
    expect(screen.getByRole('heading', { name: 'Heroes' })).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/monsters" />
    );
    expect(
      screen.getByRole('heading', { name: 'Monsters' })
    ).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/locations" />
    );
    expect(
      screen.getByRole('heading', { name: 'Locations' })
    ).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/treasure" />
    );
    expect(
      screen.getByRole('heading', { name: 'Treasure' })
    ).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/logout" />
    );
    expect(screen.getByRole('heading', { name: 'Logout' })).toBeInTheDocument();
    cleanup();
  });

  it('navigates to unauthenticated-only routes only without an authToken', () => {
    render(<WrappedRouterProvider tokenValue={null} routePath="/login" />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    cleanup();

    render(<WrappedRouterProvider tokenValue={null} routePath="/register" />);
    expect(
      screen.getByRole('heading', { name: 'Register' })
    ).toBeInTheDocument();
    cleanup();

    render(<WrappedRouterProvider tokenValue="TestToken" routePath="/login" />);
    expect(
      screen.getByRole('heading', { name: 'Not Found' })
    ).toBeInTheDocument();
    cleanup();

    render(
      <WrappedRouterProvider tokenValue="TestToken" routePath="/register" />
    );
    expect(
      screen.getByRole('heading', { name: 'Not Found' })
    ).toBeInTheDocument();
    cleanup();
  });

  // it('omits un-authenticated only routes when authToken is present', async () => {
  //   const authProps = { testValue: 'TestToken' };

  //   render(
  //     <AuthProvider {...authProps}>
  //       <GraphQLProvider>
  //         <Routes />
  //       </GraphQLProvider>
  //     </AuthProvider>
  //   );

  //   const user = userEvent.setup();

  //   const loginButton = await screen.findByRole('button', { name: 'login' });

  //   await user.click(loginButton);

  //   expect(
  //     await screen.findByRole('heading', { name: 'Not Found' })
  //   ).toBeInTheDocument();
  // });
});
