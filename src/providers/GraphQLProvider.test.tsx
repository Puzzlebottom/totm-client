import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import GraphQLProvider from './GraphQLProvider';

export const TEST_QUERY = gql(`
  query testQuery {
    status
  }
`);

export const TEST_MUTATION = gql(`
  mutation testMutation {
    status
  }
`);

function TestComponent() {
  const [queryStatus, setQueryStatus] = useState('fail');
  const [mutationStatus, setMutationStatus] = useState('fail');
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

  return (
    <>
      <div data-testid="query-status">{queryStatus}</div>
      <div data-testid="mutation-status">{mutationStatus}</div>
    </>
  );
}

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
});
