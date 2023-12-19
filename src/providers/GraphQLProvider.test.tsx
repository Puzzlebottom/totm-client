/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import AuthProvider from './AuthProvider';
import GraphQLProvider from './GraphQLProvider';
import { TEST_AUTH, TEST_MUTATION, TEST_QUERY } from '../mocks/handlers';

function TestComponent() {
  const [queryStatus, setQueryStatus] = useState('fail');
  const [mutationStatus, setMutationStatus] = useState('fail');
  const [token, setToken] = useState('');
  const [mutate] = useMutation(TEST_MUTATION);

  const { data: queryData } = useQuery(TEST_QUERY);

  useEffect(() => {
    if (queryData) {
      setQueryStatus(queryData.status);
    }
  }, [queryData]);

  const testMutation = async () => {
    const { data: mutationData } = await mutate();

    if (mutationData) {
      setMutationStatus(mutationData.status);
    }
  };

  useEffect(() => {
    testMutation();
  });

  const { data: authData } = useQuery(TEST_AUTH);

  useEffect(() => {
    if (authData) {
      setToken(authData.token);
    }
  }, [authData]);

  return (
    <>
      <div data-testid="query-status">{queryStatus}</div>
      <div data-testid="mutation-status">{mutationStatus}</div>
      <div data-testid="token">{token}</div>
    </>
  );
}

vi.mock('./AuthProvider');

describe('GraphQLProvider', () => {
  it('provides the expected GraphQLContext to child components', async () => {
    render(
      <GraphQLProvider>
        <TestComponent />
      </GraphQLProvider>
    );

    await waitFor(async () => {
      expect(await screen.findByTestId('query-status')).toHaveTextContent(
        'success'
      );
    });

    await waitFor(async () => {
      expect(await screen.findByTestId('mutation-status')).toHaveTextContent(
        'success'
      );
    });
  });

  it('sets a provided authToken to the authorization header of its requests', async () => {
    const authProps = { testValue: 'TestToken' };
    render(
      <AuthProvider {...authProps}>
        <GraphQLProvider>
          <TestComponent />
        </GraphQLProvider>
      </AuthProvider>
    );

    await waitFor(async () => {
      expect(await screen.findByTestId('token')).toHaveTextContent(
        'Bearer TestToken'
      );
    });
  });

  it('sets no authorization header when the provided authToken is null', async () => {
    const authProps = { testValue: null };
    render(
      <AuthProvider {...authProps}>
        <GraphQLProvider>
          <TestComponent />
        </GraphQLProvider>
      </AuthProvider>
    );

    await waitFor(async () => {
      expect(await screen.findByTestId('token')).toBeEmptyDOMElement();
    });
  });
});
