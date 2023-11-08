import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';

import EncounterSearchBar from './EncounterSearchBar';
import encounters from '../mocks/encounters';

const callbackMock = vi.fn();

const setupTest = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <EncounterSearchBar data={encounters} callback={callbackMock} />
    </QueryClientProvider>
  );
};

beforeAll(() => {
  setupTest();
});

afterAll(() => {
  vi.clearAllMocks();
});

describe.skip('Encounter search bar', () => {
  it('should autocomplete user input based on current encounters', () => { });

  it('should open the Select Encounter modal when an existing encounter name is submitted', () => { });

  it('should render text that no such encounter exists when submitted without a valid encounter name', () => { });

  it('should render text that a name is required when submitted with no input', () => { });
});
