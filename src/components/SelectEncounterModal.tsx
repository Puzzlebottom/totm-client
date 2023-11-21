import useModal from '../hooks/useModal';
import { Encounter } from '../interfaces/Encounter';
import Modal from './Modal';

type Props = {
  encounter: Encounter | null;
  isOpen: boolean;
  deleteEncounter: (encounterId: number) => void;
  editEncounter: (encounterId: number) => void;
  runEncounter: (encounterId: number) => void;
  onClose: () => void;
};

export default function SelectEncounterModal({
  encounter,
  isOpen,
  deleteEncounter,
  editEncounter,
  runEncounter,
  onClose,
}: Props): React.ReactNode {
  const [
    isConfirmDeleteModalOpen,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
  ] = useModal(false);

  const handleDelete = () => {
    if (encounter) {
      deleteEncounter(encounter.id);
      closeConfirmDeleteModal();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} hasCloseBtn onClose={onClose}>
      <article>
        {encounter && (
          <>
            <h3>{encounter.name}</h3>
            <p>{encounter.description}</p>
            <footer>
              <button
                type="button"
                aria-label="delete"
                className="button-warning"
                onClick={openConfirmDeleteModal}
              >
                Delete
              </button>
              <button
                type="button"
                aria-label="edit"
                className="button-secondary-solid"
                onClick={() => editEncounter(encounter.id)}
              >
                Edit
              </button>
              <button
                type="button"
                aria-label="run"
                className="button-primary-solid"
                onClick={() => runEncounter(encounter.id)}
              >
                Run
              </button>
            </footer>
          </>
        )}
      </article>
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        hasCloseBtn={false}
        onClose={closeConfirmDeleteModal}
      >
        <article>
          <header>
            <p>Are you sure you want to delete {encounter?.name}?</p>
          </header>
          <button
            type="button"
            aria-label="cancel delete"
            className="button-primary-solid"
            onClick={closeConfirmDeleteModal}
          >
            Cancel
          </button>
          <button
            type="button"
            aria-label="confirm delete"
            className="button-warning"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </article>
      </Modal>
    </Modal>
  );
}
