import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EncounterCard from './EncounterCard';
import { Encounter } from '../interfaces/Encounter';

const mockEncounter: Encounter = {
  id: 4,
  name: 'Test Encounter',
  description: 'Cool Description',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: Date.now(),
};

const selectEncounterMock = vi.fn();

const setupTest = () => {
  render(
    <EncounterCard
      encounter={mockEncounter}
      selectEncounter={selectEncounterMock}
    />
  );
};

describe('Encounter card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should contain the name and description of the encounter', async () => {
    setupTest();

    expect(await screen.findByText(mockEncounter.name)).toBeInTheDocument();
    expect(
      await screen.findByText(mockEncounter.description)
    ).toBeInTheDocument();
  });

  it('should call the selectEncounter function when clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const encounterCard = await screen.findByRole('button', {
      name: 'encounter card',
    });

    await user.click(encounterCard);

    expect(selectEncounterMock).toHaveBeenCalledWith(mockEncounter);
  });
});
