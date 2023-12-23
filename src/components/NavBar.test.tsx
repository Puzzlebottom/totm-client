import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';
import GraphQLProvider from '../providers/GraphQLProvider';

const mockedUseNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

const setupTest = () => {
  const links = ['heroes', 'monsters', 'locations', 'treasure'];
  render(
    <GraphQLProvider>
      <MemoryRouter>
        <NavBar links={links} />
      </MemoryRouter>
    </GraphQLProvider>
  );
};

describe('NavBar', () => {
  it('should render page links', async () => {
    setupTest();

    const [homepageLink, ...rest] = await screen.findAllByRole('link');

    expect(homepageLink).toHaveTextContent('TOTM');
    expect(rest).toHaveLength(4);
  });

  it('should have a button for login', async () => {
    setupTest();
    const user = userEvent.setup();
    const loginButton = await screen.findByRole('button', { name: 'login' });

    expect(loginButton).toBeInTheDocument();

    await user.click(loginButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/login');
  });

  it('should have a button for register', async () => {
    setupTest();
    const user = userEvent.setup();
    const registerButton = await screen.findByRole('button', {
      name: 'register',
    });

    await user.click(registerButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/register');
  });
});
