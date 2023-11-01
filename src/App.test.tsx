import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

describe('App', () => {
  it('renders the app and displays it', () => {
    render(<WrappedApp />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World!'
    );
  });

  it('Renders not found if path is invalid', () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Not Found'
    );
  });
});
