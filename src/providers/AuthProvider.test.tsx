import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider, { useAuth } from './AuthProvider';
import localStorageMock from '../mocks/localStorage';

let originalLocalStorage: Storage;

function TestComponent() {
  const { token, setToken } = useAuth();

  return (
    <>
      <p data-testid="token">{token}</p>
      <button type="button" onClick={() => setToken('Test')}>
        SET
      </button>
      <button type="button" onClick={() => setToken(null)}>
        UNSET
      </button>
    </>
  );
}

beforeAll((): void => {
  originalLocalStorage = window.localStorage;
  (window as Window & typeof globalThis).localStorage = localStorageMock;
});

afterAll((): void => {
  (window as Window & typeof globalThis).localStorage = originalLocalStorage;
});

describe('AuthProvider', () => {
  it('provides expected AuthContext to child elements', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const tokenElement = await screen.findByTestId('token');
    const setButton = await screen.findByText('SET');
    const unsetButton = await screen.findByText('UNSET');

    expect(tokenElement).toBeEmptyDOMElement();

    const user = userEvent.setup();

    await user.click(setButton);
    expect(tokenElement).toHaveTextContent('Test');

    await user.click(unsetButton);
    expect(tokenElement).toBeEmptyDOMElement();
  });
});
