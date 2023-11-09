import { useState } from 'react';

export default function useModal(
  defaultIsOpen: boolean
): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return [isOpen, openModal, closeModal];
}
