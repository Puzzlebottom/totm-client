import { describe, it, expect, vi, afterEach } from 'vitest';
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

afterEach(() => {
  vi.restoreAllMocks();
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

  it('should clear the autocomplete suggestions if the search no longer matches', async () => {
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

    await user.type(input, 'Foo');

    expect(input).toHaveValue('TestFoo');
    expect(autocomplete).toHaveValue('');
  });

  it('should select the encounter and open the Select Encounter modal when the search returns a single result', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Test Encounter 1{Enter}');

    expect(selectEncounterMock).toHaveBeenCalledWith(0);
  });

  it('should render text that no such encounter exists when the search returns no results', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Foobar{Enter}');

    expect(
      await screen.findByText('No encounter exists called Foobar')
    ).toBeInTheDocument();
  });

  it('should not render No encounter found when the search returns results', async () => {
    setupTest(encountersMock);

    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    expect(screen.queryByText('No encounter exists called ')).toBeNull();

    await user.type(input, 'Test');

    expect(screen.queryByText('No encounter exists called ')).toBeNull();
  });

  it('should filter displayed encounters when the search returns multiple results', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Test{Enter}');

    expect(filterEncountersMock).toHaveBeenCalledWith(encountersMock);
  });

  it('should reset the filter to display all encounters when the search returns one or zero results', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Test Encounter 1{Enter}');

    expect(filterEncountersMock).toHaveBeenCalledWith(encountersMock);
  });

  it('should keep the input value when the search returns multiple results', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Test{Enter}');

    expect(input).toHaveValue('Test');
  });

  it('should clear the input value when the search returns a single result or no results', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'Test Encounter 1{Enter}');

    expect(input).toHaveValue('');
  });

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
    await user.type(input, '{Backspace>16/}');

    expect(input).toHaveValue('');
    expect(autocomplete).toHaveValue('');
    expect(filterEncountersMock).toHaveBeenCalledWith(encountersMock);
  });

  it('should render text that a name is required when submitted with no input', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, '{Enter}');

    expect(
      await screen.findByText('Enter a name to search...')
    ).toBeInTheDocument();
  });

  it('should replace the search value with the suggestion if the right arrow button is pressed', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    await user.type(input, 'T');

    expect(input).toHaveValue('T');
    expect(autocomplete).toHaveValue('Test Encounter 1');

    await user.type(input, '{arrowright}');

    expect(input).toHaveValue('Test Encounter 1');
    expect(autocomplete).toHaveValue('Test Encounter 1');
  });

  it('should replace the autocomplete value with a different value after autocomplete if one exists', async () => {
    setupTest([
      {
        id: 0,
        name: 'cat',
        description: 'meow',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699176091596,
      },
      {
        id: 1,
        name: 'cats',
        description: 'meow meow',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699213770040,
      },
    ]);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    await user.type(input, 'c');

    expect(input).toHaveValue('c');
    expect(autocomplete).toHaveValue('cat');

    await user.type(input, '{arrowright}');

    expect(input).toHaveValue('cat');
    expect(autocomplete).toHaveValue('cats');

    await user.type(input, '{arrowright}');

    expect(input).toHaveValue('cats');
    expect(autocomplete).toHaveValue('cats');
  });

  it('should be case-insensitive', async () => {
    setupTest(encountersMock);
    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    await user.type(input, 'test');

    expect(autocomplete).toHaveValue('test Encounter 1');

    await user.clear(input);
    await user.type(input, 'TEST');

    expect(autocomplete).toHaveValue('TEST Encounter 1');

    await user.type(input, '{Enter}');

    expect(input).toHaveValue('TEST');
    expect(autocomplete).toHaveValue('TEST Encounter 1');
    expect(
      await screen.findByText('No encounter exists called TEST')
    ).toBeInTheDocument();

    await user.type(input, ' ENCOUNTER 1');

    expect(autocomplete).toHaveValue('TEST ENCOUNTER 1');

    await user.type(input, '{Enter}');

    expect(input).toHaveValue('');
    expect(autocomplete).toHaveValue('');
    expect(selectEncounterMock).toHaveBeenCalledWith(0);
  });

  it('should select an encounter on submit when multiple encounters are displayed if the encounter name is an exact case matc', async () => {
    const encounters = [
      {
        id: 0,
        name: 'TEST',
        description: 'test',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699176091596,
      },
      {
        id: 1,
        name: 'test',
        description: 'test test',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699213770040,
      },
    ];
    setupTest(encounters);

    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    await user.type(input, 'test{Enter}');

    expect(selectEncounterMock).toHaveBeenCalledWith(1);
  });

  it('should not select an encounter, even on an exact match, if multiple encounters exist with matching names', async () => {
    const encounters = [
      {
        id: 0,
        name: 'test',
        description: 'test',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699176091596,
      },
      {
        id: 1,
        name: 'test',
        description: 'test',
        isActive: false,
        round: 0,
        turn: 0,
        owner: 0,
        createdAt: 1699213770040,
      },
    ];
    setupTest(encounters);

    const user = userEvent.setup();

    const input = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });
    const autocomplete = await screen.findByRole('textbox', {
      name: 'encounter search autocomplete',
    });

    await user.type(input, 'test{Enter}');

    expect(input).toHaveValue('test');
    expect(autocomplete).toHaveValue('test');
    expect(selectEncounterMock).not.toHaveBeenCalled();
  });
});
