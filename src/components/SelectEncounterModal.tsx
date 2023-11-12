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
      <form aria-label="Select Encounter Form">
        {encounter && (
          <>
            <h3>{encounter.name}</h3>
            <p>{encounter.description}</p>
            <footer>
              <button
                type="button"
                aria-label="delete"
                className="warning"
                onClick={openConfirmDeleteModal}
              >
                Delete
              </button>
              <button
                type="button"
                aria-label="edit"
                className="secondary"
                onClick={() => editEncounter(encounter.id)}
              >
                Edit
              </button>
              <button
                type="button"
                aria-label="run"
                onClick={() => runEncounter(encounter.id)}
              >
                Run
              </button>
            </footer>
          </>
        )}
      </form>
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        hasCloseBtn={false}
        onClose={closeConfirmDeleteModal}
      >
        <header>
          <p>Are you sure you want to delete {encounter?.name}?</p>
        </header>
        <button
          type="button"
          aria-label="cancel delete"
          onClick={closeConfirmDeleteModal}
        >
          Cancel
        </button>
        <button
          type="button"
          aria-label=" confirm delete"
          onClick={handleDelete}
        >
          Confirm
        </button>
      </Modal>
    </Modal>
  );
}
