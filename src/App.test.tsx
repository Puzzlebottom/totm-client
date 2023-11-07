import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { HashRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

describe.skip('App', () => {
  it.skip('renders the app and displays it', () => {
    render(<WrappedApp />);
  });

  it('Renders not found if path is invalid', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Not Found'
    );
  });
});
