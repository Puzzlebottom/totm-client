import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import NavBar from './NavBar';

const setupTest = () => {
  const links = ['heroes', 'monsters', 'locations', 'treasure'];
  render(
    <HashRouter>
      <NavBar links={links} />
    </HashRouter>
  );
};

describe('NavBar', () => {
  it('should render page links', async () => {
    setupTest();

    const [homepageLink, ...rest] = await screen.findAllByRole('link');

    expect(homepageLink).toHaveTextContent('TOTM');
    expect(rest).toHaveLength(4);
  });

  it('should have buttons for login and register', async () => {
    setupTest();

    expect(
      await screen.findByRole('button', { name: 'login' })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('button', { name: 'register' })
    ).toBeInTheDocument();
  });
});
