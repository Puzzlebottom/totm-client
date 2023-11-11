import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

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

  describe.skip('Add Encounter button', async () => {
    it('should open the add encounter modal when clicked', () => { });
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

    describe('Encounter card', () => {
      it('should contain the name and description of the encounter', () => { });

      it('should open the Select Encounter modal when clicked', () => { });
    });
  });

  describe.skip('Select Encounter Modal', () => {
    it('should be hidden by default', () => { });

    it('should have a close button that hides the modal', () => { });

    it('should have a delete button', () => { });

    it('the delete button should open a confirmation dialog when clicked', () => { });

    it('the delete button should delete the encounter after confirmation', () => { });

    it('should have an edit button');

    it('the edit button should open the Edit encounter Modal when clicked', () => { });

    it('should have a run button', () => { });

    it('the run button should set the encounter as Selected Encounter', () => { });

    it('the run button should navigate to the Encounter Runner page', () => { });
  });

  describe.skip('Edit Encounter Modal', () => {
    it('should be hidden by default', () => { });

    it('should have a close button that hides the modal', () => { });

    it('should have buttons to cancel and confirm the edit', () => { });

    it('should have text inputs for name and description', () => { });

    it('should fill the inputs with the name and description of the encounter', () => { });

    it('should not accept invalid input', () => { });

    it('should render warning text if invalid input is submitted', () => { });

    it('should edit the encounter information', () => { });
  });
});
