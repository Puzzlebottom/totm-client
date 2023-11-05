import { useEffect, useRef, useState } from 'react';
import '../styles/modal.css';

type Props = {
  isOpen: boolean;
  hasCloseBtn: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  hasCloseBtn = false,
  onClose,
  children,
}: Props): React.ReactNode {
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setIsVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isVisible) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isVisible]);

  return (
    <dialog ref={modalRef} role="presentation" onKeyDown={handleKeyDown}>
      <article>
        {hasCloseBtn && (
          <button
            type="button"
            aria-label="Close"
            className="close"
            onClick={handleCloseModal}
          />
        )}
        {children}
      </article>
    </dialog>
  );
}
