import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { encounters } from '../data/encounters';

// This is a work-around until jsDom implements HTMLDialogElement
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('Home', () => {
  it('should render a list of encounters', () => {
    render(<Home />);

    expect(screen.getAllByRole('article').length).toEqual(encounters.length);
  });

  it.skip('should render the encounters from newest to oldest', () => {
    render(<Home />);
  });

  it.skip('should render a button to add new encounters', () => {
    render(<Home />);
  });
});
