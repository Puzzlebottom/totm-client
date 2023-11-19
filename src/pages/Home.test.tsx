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
      name: 'encounters',
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

  it('should hide all modals by default', async () => {
    setupTest();

    const modals = await screen.findAllByRole('dialog', { hidden: true });

    modals.forEach((modal) => {
      expect((modal as HTMLDialogElement).open).toBe(false);
    });
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

  describe('Encounter List', () => {
    it('should render the encounter cards', async () => {
      setupTest();

      expect(await screen.findAllByLabelText('encounter card')).toHaveLength(3);
    });

    it('should add new encounters', async () => {
      setupTest();
      const user = userEvent.setup();

      expect(await screen.findAllByLabelText('encounter card')).toHaveLength(3);

      const addEncounterButton = await screen.findByLabelText('add encounter');
      await user.click(addEncounterButton);

      const nameInput = await screen.findByLabelText('name');
      const descriptionInput = await screen.findByLabelText('description');

      await user.type(nameInput, 'New Encounter');
      await user.type(descriptionInput, 'A Cool Description');

      const submitButton = await screen.findByLabelText('create');

      await user.click(submitButton);

      expect(await screen.findAllByLabelText('encounter card')).toHaveLength(4);
    });

    it('should remove deleted encounters', async () => {
      setupTest();
      const user = userEvent.setup();

      const encounterCards = await screen.findAllByLabelText('encounter card');

      await user.click(encounterCards[0]);

      const deleteButton = await screen.findByLabelText('delete');
      const confirmButton = await screen.findByLabelText('confirm delete');

      expect(encounterCards).toHaveLength(3);

      await user.click(deleteButton);
      await user.click(confirmButton);

      expect(await screen.findAllByLabelText('encounter card')).toHaveLength(2);
    });

    it('should update edited encounters', async () => {
      setupTest();
      const user = userEvent.setup();

      const encounterCards = await screen.findAllByLabelText('encounter card');

      await user.click(encounterCards[0]);

      const editButton = await screen.findByLabelText('edit');

      await user.click(editButton);

      const nameInput = await screen.findByLabelText('edit name');
      const descriptionInput = await screen.findByLabelText('edit description');

      expect(nameInput).toHaveDisplayValue('Test Encounter 3');
      expect(descriptionInput).toHaveDisplayValue('Cool description 3');

      await userEvent.clear(nameInput);
      await userEvent.clear(descriptionInput);
      await user.type(nameInput, 'Updated Name');
      await user.type(descriptionInput, 'Updated Description');

      const saveButton = await screen.findByLabelText('save');

      await user.click(saveButton);

      const updatedEncounterCards =
        await screen.findAllByLabelText('encounter card');

      expect(updatedEncounterCards).toHaveLength(3);

      expect(updatedEncounterCards[0]).not.toHaveTextContent(
        'Test Encounter 3'
      );
      expect(updatedEncounterCards[0]).not.toHaveTextContent(
        'Cool description 3'
      );
      expect(updatedEncounterCards[0]).toHaveTextContent('Updated Name');
      expect(updatedEncounterCards[0]).toHaveTextContent('Updated Description');
    });

    it('should render the encounters from newest to oldest', async () => {
      setupTest();
      const user = userEvent.setup();

      let encounters = await screen.findAllByLabelText('encounter card');
      expect(encounters[0]).toHaveTextContent('Test Encounter 3');
      expect(encounters[1]).toHaveTextContent('Test Encounter 2');
      expect(encounters[2]).toHaveTextContent('Test Encounter 1');

      const addEncounterButton = await screen.findByLabelText('add encounter');
      await user.click(addEncounterButton);

      const nameInput = await screen.findByLabelText('name');
      const descriptionInput = await screen.findByLabelText('description');

      await user.type(nameInput, 'Test Encounter 4');
      await user.type(descriptionInput, 'A Cool Description');

      const submitButton = await screen.findByLabelText('create');

      await user.click(submitButton);

      encounters = await screen.findAllByLabelText('encounter card');
      expect(encounters[0]).toHaveTextContent('Test Encounter 4');

      expect(await screen.findAllByLabelText('encounter card')).toHaveLength(4);
    });
  });
});
