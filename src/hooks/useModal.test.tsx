import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useModal from './usemodal';

function TestComponent({ defaultOpen }: { defaultOpen: boolean }): JSX.Element {
  const [isOpen, openModal, closeModal] = useModal(defaultOpen);

  return (
    <>
      {isOpen && <div>OPEN</div>}
      {!isOpen && <div>CLOSED</div>}
      <button type="button" aria-label="open" onClick={openModal} />
      <button type="button" aria-label="close" onClick={closeModal} />
    </>
  );
}

describe('useModal', () => {
  it('initializes in the open state when passed true as a prop', async () => {
    render(<TestComponent defaultOpen />);

    expect(await screen.findByText('OPEN')).toBeVisible();
    expect(screen.queryByText('CLOSED')).toBeNull();
  });

  it('initializes in the closed state when passed false as a prop', async () => {
    render(<TestComponent defaultOpen={false} />);

    expect(await screen.findByText('CLOSED')).toBeVisible();
    expect(screen.queryByText('OPEN')).toBeNull();
  });

  it('returns functions that open and close the modal', async () => {
    render(<TestComponent defaultOpen />);
    const user = userEvent.setup();

    const closeButton = await screen.findByRole('button', { name: 'close' });
    const openButton = await screen.findByRole('button', { name: 'open' });

    expect(await screen.findByText('OPEN')).toBeVisible();
    expect(screen.queryByText('CLOSED')).toBeNull();

    await user.click(closeButton);

    expect(await screen.findByText('CLOSED')).toBeVisible();
    expect(screen.queryByText('OPEN')).toBeNull();

    await user.click(openButton);

    expect(await screen.findByText('OPEN')).toBeVisible();
    expect(screen.queryByText('CLOSED')).toBeNull();
  });
});
