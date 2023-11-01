import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders the app and displays it', () => {
    // ARRANGE
    render(<App />);

    // ACT

    // ASSERT
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World!'
    );
  });
});
