import { describe, it, expect, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

const onCloseMock = vi.fn();

describe('Modal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is visible when the isOpen prop is true', async () => {
    render(
      <Modal isOpen hasCloseBtn onClose={onCloseMock}>
        <div />
      </Modal>
    );

    const modal = await screen.findByRole('dialog', { hidden: true });
    expect(modal).toBeInTheDocument();
    expect((modal as HTMLDialogElement).open).toBe(true);
  });

  it('is not visible whe the isOpen prop is false', async () => {
    render(
      <Modal isOpen={false} hasCloseBtn onClose={onCloseMock}>
        <div />
      </Modal>
    );

    const modal = await screen.findByRole('dialog', { hidden: true });
    expect(modal).toBeInTheDocument();
    expect((modal as HTMLDialogElement).open).toBe(false);
  });

  it('renders a close button when the hasCloseBtn prop is true', async () => {
    render(
      <Modal isOpen hasCloseBtn onClose={onCloseMock}>
        <div />
      </Modal>
    );

    expect(await screen.findByLabelText('close')).toBeInTheDocument();
  });

  it('does not render a close button when the hasCloseBtn prop is false', () => {
    render(
      <Modal isOpen hasCloseBtn={false} onClose={onCloseMock}>
        <div />
      </Modal>
    );

    expect(screen.queryByLabelText('close')).toBeNull();
  });

  it('closes when the close button is clicked', async () => {
    render(
      <Modal isOpen hasCloseBtn onClose={onCloseMock}>
        <div />
      </Modal>
    );

    const user = userEvent.setup();
    const closeButton = await screen.findByLabelText('close');
    const modal = await screen.findByRole('dialog', { hidden: true });

    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
    expect((modal as HTMLDialogElement).open).toBe(false);
  });

  it('closes when the escape key is pressed', async () => {
    render(
      <Modal isOpen hasCloseBtn onClose={onCloseMock}>
        <div />
      </Modal>
    );

    const modal = await screen.findByRole('dialog', { hidden: true });

    fireEvent.keyDown(modal, { key: 'Escape' });

    expect(onCloseMock).toHaveBeenCalled();
    expect((modal as HTMLDialogElement).open).toBe(false);
  });
});
