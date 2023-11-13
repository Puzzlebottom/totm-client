import { describe, it, expect, vi, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import EncounterSearchBar from './EncounterSearchBar';
import encountersMock from '../mocks/encounters';
import { Encounter } from '../interfaces/Encounter';

const filterEncountersMock = vi.fn();
const selectEncounterMock = vi.fn();

const setupTest = (encounters: Encounter[]) => {
  render(
    <EncounterSearchBar
      data={encounters}
      filterEncounters={filterEncountersMock}
      selectEncounter={selectEncounterMock}
    />
  );
};

afterAll(() => {
  vi.clearAllMocks();
});

describe('Encounter search bar', () => {
  it('should autocomplete user input based on current encounters', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    expect(autocomplete).toHaveValue('');

    await user.type(input, 'Test');
    expect(autocomplete).toHaveValue('Test Encounter 1');
  });

  it.skip('should clear the autocomplete suggestions if the search no longer matches', () => { });

  it.skip('should select the encounter and open the Select Encounter modal when the search returns a single result', () => { });

  it.skip('should render text that no such encounter exists when the search returns no results', () => { });

  it.skip('should filter displayed encounters when the search returns multiple results', () => { });

  it.skip('should keep the input value when the search returns multiple results', () => { });

  it.skip('should clear the input value when the search returns a single result or no results', () => { });

  it('should display all encounters when there is no value in the input', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    await user.type(input, 'Test');

    expect(autocomplete).toHaveValue('Test Encounter 1');

    await user.clear(input);
    await user.click(input);
    await user.keyboard('{Backspace>16/}');

    expect(input).toHaveValue('');
    expect(autocomplete).toHaveValue('');
  });

  it.skip('should be case-insensitive', () => { });

  it.skip('should render text that a name is required when submitted with no input', () => { });

  it.skip('should replace the search value with the suggestion if the tab button is pressed', () => { });

  it.skip('should move focus normally if there are no suggestions or if the suggestion matches the search value', () => { });
});
