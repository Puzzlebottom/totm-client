import { useState } from 'react';

export default function useModal(
  defaultIsOpen: boolean
): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
}
