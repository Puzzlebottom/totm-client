import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Home from './Home';

const setupTest = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

describe('Home', () => {
  it('should render an encounter search bar', async () => {
    setupTest();

    const searchForm = await screen.findByRole('form', {
      name: 'encounter search form',
    });
    const searchInput = await screen.findByRole('textbox', {
      name: 'encounter search input',
    });

    expect(searchForm).toBeInTheDocument();
    expect(searchForm).toContainElement(searchInput);
  });

  it('should render an Add Encounter button', async () => {
    setupTest();

    expect(
      await screen.findByRole('button', { name: 'add encounter' })
    ).toBeInTheDocument();
  });

  it('should render a list of encounters', async () => {
    setupTest();

    expect(
      await screen.findAllByRole('button', { name: 'encounter card' })
    ).toHaveLength(3);
  });

  it('should render an Add Encounter modal', async () => {
    setupTest();

    expect(
      await screen.findByRole('form', {
        name: 'New Encounter Form',
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it('should render a Select Encounter modal', async () => {
    setupTest();

    expect(
      await screen.findByRole('form', {
        name: 'Select Encounter Form',
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it('should render an Edit Encounter modal', async () => {
    setupTest();

    expect(
      await screen.findByRole('form', {
        name: 'Edit Encounter Form',
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it('should hide all modals by default', () => { });

  describe.skip('Encounter search bar', () => {
    it('should autocomplete user input based on current encounters', () => { });

    it('should open the Select Encounter modal when an existing encounter name is submitted', () => { });

    it('should render text that no such encounter exists when submitted without a valid encounter name', () => { });

    it('should render text that a name is required when submitted with no input', () => { });
  });

  describe('Add Encounter button', async () => {
    it('should open the add encounter modal when clicked', async () => {
      setupTest();
      const user = userEvent.setup();

      const addEncounterButton = await screen.findByLabelText('add encounter');
      const addEncounterModal = await screen.findByText('Create New Encounter');

      expect(addEncounterModal).not.toBeVisible();

      await user.click(addEncounterButton);

      expect(addEncounterModal).toBeVisible();
    });
  });

  describe.skip('Encounter List', () => {
    it('should render the encounter cards', () => { });

    it('should add new encounters', () => { });

    it('should remove deleted encounters', () => { });

    it('should update edited encounters', () => { });

    it('should render the encounters from newest to oldest', async () => {
      setupTest();

      expect(await screen.findAllByRole('article'));
    });

    describe.skip('Encounter card', () => {
      it('should contain the name and description of the encounter', () => { });

      it('should open the Select Encounter modal when clicked', () => { });
    });
  });
});
