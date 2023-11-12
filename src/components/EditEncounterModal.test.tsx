import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Encounter } from '../interfaces/Encounter';
import EditEncounterModal from './EditEncounterModal';

const onSubmitMock = vi.fn();
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
    <EditEncounterModal
      encounter={testEncounter}
      isOpen
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
    />
  );
};

describe('Edit Encounter Modal', () => {
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

  it('should have buttons to cancel and confirm the edit', async () => {
    setupTest();
    const user = userEvent.setup();

    const cancelButton = await screen.findByLabelText('cancel');
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should have text inputs for name and description', async () => {
    setupTest();

    expect(await screen.findByLabelText('name')).toBeInTheDocument();
    expect(await screen.findByLabelText('description')).toBeInTheDocument();
  });

  it('should fill the inputs with the name and description of the encounter', async () => {
    setupTest();

    const nameInput = await screen.findByLabelText('name');
    const descriptionInput = await screen.findByLabelText('description');

    expect(nameInput).toHaveDisplayValue('Test Encounter');
    expect(descriptionInput).toHaveDisplayValue('A Cool Description');
  });

  it('should not submit or close if the save button is clicked while the fields contain invalid input', async () => {
    setupTest();
    const user = userEvent.setup();

    const nameInput = await screen.findByLabelText('name');
    const descriptionInput = await screen.findByLabelText('description');
    const submitButton = await screen.findByLabelText('save');

    await userEvent.clear(nameInput);
    await userEvent.clear(descriptionInput);

    await user.click(submitButton); // no input

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
    expect(await screen.findByText('Name required!')).toBeInTheDocument();
    expect(
      await screen.findByText('Description required!')
    ).toBeInTheDocument();

    await user.type(nameInput, '{a>51/}'); // longer input that 50 char max
    await user.type(descriptionInput, '{a>301/}'); // longer input than 300 char max
    await user.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
    expect(await screen.findByText('Name too long!')).toBeInTheDocument();
    expect(
      await screen.findByText('Description too long!')
    ).toBeInTheDocument();
  });
});

it('should call the editEncounter function if the save button is clicked while the fields contain valid input', async () => {
  setupTest();
  const user = userEvent.setup();

  const nameInput = await screen.findByLabelText('name');
  const descriptionInput = await screen.findByLabelText('description');
  const submitButton = await screen.findByLabelText('save');

  await userEvent.clear(nameInput);
  await userEvent.clear(descriptionInput);

  await user.type(nameInput, 'Updated Name');
  await user.type(descriptionInput, 'Updated Description');
  await user.click(submitButton);

  expect(onSubmitMock).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Updated Name',
      description: 'Updated Description',
    })
  );

  expect(onCloseMock).toHaveBeenCalled();
});
