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
  const handleDelete = () => {
    if (encounter) {
      deleteEncounter(encounter.id);
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
              <button type="button" className="warning" onClick={handleDelete}>
                Delete
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => editEncounter(encounter.id)}
              >
                Edit
              </button>
              <button type="button" onClick={() => runEncounter(encounter.id)}>
                Run
              </button>
            </footer>
          </>
        )}
      </form>
    </Modal>
  );
}
