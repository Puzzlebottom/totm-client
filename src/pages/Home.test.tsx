import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  const queryClient = new QueryClient();

  it('should render an encounter search bar', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole('textbox', { name: 'search encounters' })
    ).toBeInTheDocument();
  });

  it('should render an Add Encounter button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole('button', { name: 'add encounter' })
    ).toBeInTheDocument();
  });

  it('should render a list of encounters', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole('form', {
        name: 'Create New Encounter',
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it('should render an Add Encounter modal', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(
      await screen.findByRole('form', {
        name: 'New Encounter Form',
        hidden: true,
      })
    ).toBeInTheDocument();
  });

  it('should render a Select Encounter modal', () => { });

  it('should render an Edit Encounter modal', () => { });

  describe('Encounter search bar', () => {
    it('should autocomplete user input based on current encounters', () => { });

    it('should open the Select Encounter modal when an existing encounter name is submitted', () => { });

    it('should render text that no such encounter exists when submitted without a valid encounter name', () => { });

    it('should render text that a name is required when submitted with no input', () => { });
  });

  describe('Add Encounter button', async () => {
    it('should open the add encounter modal when clicked', () => { });
  });

  describe('Encounter List', () => {
    it('should render the encounter cards', () => { });

    it('should add new encounters', () => { });

    it('should remove deleted encounters', () => { });

    it('should update edited encounters', () => { });

    it('should render the encounters from newest to oldest', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      );

      expect(await screen.findAllByRole('article'));
    });

    describe('Encounter card', () => {
      it('should contain the name and description of the encounter', () => { });

      it('should open the Select Encounter modal when clicked', () => { });
    });
  });

  describe('Add Encounter modal', async () => {
    it('should be hidden by default', () => { });

    it('should contain a close button that hides the modal', () => { });

    it('should contain a cancel button that hides the modal', () => { });

    it('should contain a submit button', () => { });

    it('should contain text inputs for name and description', () => { });

    it('should close it the submit button is clicked while the fields contain valid input', () => { });

    it('should not close if the submit button clicked while the fields contain invalid input', () => { });
  });

  describe('Select Encounter Modal', () => {
    it('should be hidden by default', () => { });

    it('should have a close button that hides the modal', () => { });

    it('should have buttons to delete, edit and run the encounter', () => { });

    describe('Delete encounter button', () => {
      it('should open a confirmation dialog when clicked', () => { });

      it('should delete the encounter', () => { });
    });

    describe('Edit encounter button', () => {
      it('should open the Edit encounter Modal when clicked', () => { });
    });

    describe('Run encounter button', () => {
      it('should set the encounter as Active Encounter', () => { });

      it('should navigate to the Encounter Runner page', () => { });
    });
  });

  describe('Edit Encounter Modal', () => {
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
