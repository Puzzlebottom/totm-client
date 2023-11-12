import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useEncounters, { reducer } from './useEncounters';
import { Encounter } from '../interfaces/Encounter';

function TestComponent(): JSX.Element {
  const {
    encounters,
    displayedEncounters,
    selectedEncounter,
    addEncounter,
    updateEncounter,
    deleteEncounter,
    selectEncounter,
    filterEncounters,
  } = useEncounters();

  const mockEncounter: Encounter = {
    id: 4,
    name: 'Test Encounter 4',
    description: 'Cool Description 4',
    isActive: false,
    round: 0,
    turn: 0,
    owner: 0,
    createdAt: Date.now(),
  };

  const mockUpdate: {
    name: string;
    description: string;
  } = {
    name: 'New Name',
    description: 'New Description',
  };

  return (
    <>
      <ul>
        {encounters.map((encounter) => (
          <li key={encounter.id}>{encounter.name}</li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="add"
        onClick={() => addEncounter(mockEncounter)}
      >
        ADD
      </button>
      <button
        type="button"
        aria-label="update"
        onClick={() => updateEncounter({ ...mockEncounter, ...mockUpdate })}
      >
        UPDATE
      </button>
      <button
        type="button"
        aria-label="delete"
        onClick={() => deleteEncounter(0)}
      >
        DELETE
      </button>
    </>
  );
}

function setupTest() {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );
}

describe('useEncounters', () => {
  it('should return a list of saved encounters', async () => {
    setupTest();

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);
  });

  it('should delete an encounter', async () => {
    setupTest();
    const user = userEvent.setup();
    const deleteButton = await screen.findByRole('button', { name: 'delete' });

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);

    await user.click(deleteButton);

    expect(await screen.findAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('Test Encounter 1')).toBeNull();
  });

  it('should add new encounters to the list', async () => {
    setupTest();
    const user = userEvent.setup();
    const addButton = await screen.findByRole('button', { name: 'add' });

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);

    await user.click(addButton);

    expect(await screen.findAllByRole('listitem')).toHaveLength(4);
    expect(await screen.findByText('Test Encounter 4')).toBeInTheDocument();
  });

  it('should update existing encounters', async () => {
    setupTest();
    const user = userEvent.setup();
    const addButton = await screen.findByRole('button', { name: 'add' });
    const updateButton = await screen.findByRole('button', { name: 'update' });

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);

    await user.click(addButton);

    expect(await screen.findAllByRole('listitem')).toHaveLength(4);

    await user.click(updateButton);

    expect(await screen.findAllByRole('listitem')).toHaveLength(4);
    expect(await screen.findByText('New Name')).toBeInTheDocument();
  });

  it('should return the state unchanged if the reducer is called with an invalid action type', () => {
    const result = reducer({ encounters: [] }, { type: 'NON_EXISTENT_ACTION' });

    expect(result).toEqual({ encounters: [] });
  });
});
