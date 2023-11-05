import React, { useEffect, useRef, useState } from 'react';
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
    // dialog is an interactive element and there's a patch coming down the pipes from eslint
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/pull/940
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog ref={modalRef} onKeyDown={handleKeyDown}>
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
