import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render page links', () => {
    const links = ['heroes', 'monsters', 'locations', 'treasure'];
    render(
      <HashRouter>
        <NavBar links={links} />
      </HashRouter>
    );

    const [homepageLink, ...rest] = screen.getAllByRole('link');

    expect(homepageLink).toHaveTextContent('TOTM');
    expect(rest).toHaveLength(4);
  });
});
