import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { HashRouter, MemoryRouter } from 'react-router-dom';
import { afterEach } from 'node:test';
import { WrappedApp, App } from './App';

const mockHome = vi.fn(() => {
  <div aria-label="Mock Home Component" />;
});

vi.mock('./pages/Home.tsx', () => ({ default: () => mockHome() }));

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the app and displays it', async () => {
    render(<WrappedApp />);

    expect(mockHome).toBeCalled();
  });

  it('Renders not found if path is invalid', async () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <App />
      </MemoryRouter>
    );

    expect(mockHome).toBeCalled();
    expect(await screen.findByText('Not Found')).toBeInTheDocument();
  });
});
