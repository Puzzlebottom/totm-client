import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import encounters from '../data/encounters';

describe('Home', () => {
  it('should render a list of encounters', () => {
    render(<Home encounters={encounters} />);

    expect(screen.getAllByRole('article').length).toEqual(encounters.length);
  });

  it.skip('should render a button to add new encounters', () => {
    render(<Home encounters={encounters} />);
  });
});
