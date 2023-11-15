import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import AddEncounterModal from './AddEncounterModal';

const onCloseMock = vi.fn();
const onSubmitMock = vi.fn();

const setupTest = () => {
  render(
    <AddEncounterModal isOpen onClose={onCloseMock} onSubmit={onSubmitMock} />
  );
};

describe('Add Encounter modal', () => {
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

  it('should contain a cancel button that calls the onClose function when clicked', async () => {
    setupTest();
    const user = userEvent.setup();

    const cancelButton = await screen.findByLabelText('cancel');
    expect(cancelButton).toBeInTheDocument();

    await user.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should contain text inputs for name and description', async () => {
    setupTest();

    expect(await screen.findByLabelText('name')).toBeInTheDocument();
    expect(await screen.findByLabelText('description')).toBeInTheDocument();
  });

  it('should contain a create button', async () => {
    setupTest();

    expect(await screen.findByText('Create')).toBeInTheDocument();
  });

  it('should submit and close if the create button is clicked while the fields contain valid input', async () => {
    setupTest();
    const user = userEvent.setup();

    const nameInput = await screen.findByLabelText('name');
    const descriptionInput = await screen.findByLabelText('description');
    const submitButton = await screen.findByLabelText('create');

    await user.type(nameInput, 'Test Name');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Name',
        description: 'Test Description',
      })
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not submit or close if the submit button clicked while the fields contain invalid input', async () => {
    setupTest();
    const user = userEvent.setup();

    const submitButton = await screen.findByLabelText('create');

    await user.click(submitButton); // no input

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
    expect(await screen.findByText('Name required!')).toBeInTheDocument();
    expect(
      await screen.findByText('Description required!')
    ).toBeInTheDocument();

    const nameInput = await screen.findByLabelText('name');
    const descriptionInput = await screen.findByLabelText('description');

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

  it('should attempt to submit when the Enter key is pressed in either input', async () => {
    setupTest();
    const user = userEvent.setup();
    const nameInput = await screen.findByLabelText('name');
    const descriptionInput = await screen.findByLabelText('description');

    await user.type(nameInput, 'Test Name');
    await user.type(descriptionInput, 'Test Description{Enter}');

    expect(onCloseMock).toHaveBeenCalled();
    expect(onSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Name',
        description: 'Test Description',
      })
    );
  });
});
