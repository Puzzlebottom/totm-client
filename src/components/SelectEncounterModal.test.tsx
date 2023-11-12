import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Encounter } from '../interfaces/Encounter';
import SelectEncounterModal from './SelectEncounterModal';

const deleteEncounterMock = vi.fn();
const editEncounterMock = vi.fn();
const runEncounterMock = vi.fn();
const onCloseMock = vi.fn();

const testEncounter: Encounter = {
  id: 1,
  name: 'Test Encounter',
  description: 'A Cool Description',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: 0,
};

const setupTest = () => {
  render(
    <SelectEncounterModal
      encounter={testEncounter}
      isOpen
      deleteEncounter={deleteEncounterMock}
      editEncounter={editEncounterMock}
      runEncounter={runEncounterMock}
      onClose={onCloseMock}
    />
  );
};

describe('Select Encounter Modal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have a close button that calls the onClose function when clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const closeButton = await screen.findByLabelText('close');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should have a delete button', async () => {
    setupTest();

    const deleteButton = await screen.findByLabelText('delete');

    expect(deleteButton).toContainHTML('Delete');
  });

  it('should open a confirmation dialog when the delete button is clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const deleteButton = await screen.findByLabelText('delete');
    const confirmationModal = await screen.findByText(
      'Are you sure you want to delete Test Encounter?'
    );

    expect(confirmationModal).toBeInTheDocument();
    expect(confirmationModal).not.toBeVisible();

    await user.click(deleteButton);

    expect(confirmationModal).toBeVisible();
  });

  it('should delete the encounter and close the modals when the Confirm button is clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const deleteButton = await screen.findByLabelText('delete');
    const confirmationModal = await screen.findByText(
      'Are you sure you want to delete Test Encounter?'
    );
    const confirmDeleteButton = await screen.findByLabelText('confirm delete');

    await user.click(deleteButton);
    await user.click(confirmDeleteButton);

    expect(deleteEncounterMock).toBeCalledWith(testEncounter.id);
    expect(onCloseMock).toBeCalled();
    expect(confirmationModal).not.toBeVisible();
  });

  it('should close the Confirmation modal and not delete the encounter when the Cancel button is clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const deleteButton = await screen.findByLabelText('delete');

    const confirmationModal = await screen.findByText(
      'Are you sure you want to delete Test Encounter?'
    );
    const cancelDeleteButton = await screen.findByLabelText('cancel delete');

    await user.click(deleteButton);
    await user.click(cancelDeleteButton);

    expect(deleteEncounterMock).toBeCalledTimes(0);
    expect(onCloseMock).not.toBeCalled();
    expect(confirmationModal).not.toBeVisible();
  });

  it('should have an edit button', async () => {
    setupTest();

    expect(await screen.findByLabelText('edit')).toBeInTheDocument();
  });

  it('should have an Edit button that calls the editEncounter function when clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const editButton = await screen.findByLabelText('edit');
    expect(editButton).toContainHTML('Edit');

    await user.click(editButton);

    expect(editEncounterMock).toBeCalled();
  });

  it('should have a run button', async () => {
    setupTest();

    expect(await screen.findByLabelText('run')).toBeInTheDocument();
  });

  it('should have a Run button that calls the runEncounter function when clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const runButton = await screen.findByLabelText('run');
    expect(runButton).toContainHTML('Run');

    await user.click(runButton);

    expect(runEncounterMock).toBeCalled();
  });
});
