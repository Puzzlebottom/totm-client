import { Encounter } from '../interfaces/Encounter';
import Modal from './Modal';

type Props = {
  isOpen: boolean;
  onSubmit: (data: Encounter) => void;
  onClose: () => void;
};

const testEncounter: Encounter = {
  id: 12,
  name: 'Above the Clouds',
  description: 'Soaring in the golden realm of angels',
  isActive: false,
  round: 0,
  turn: 0,
  owner: 0,
  createdAt: Date.now() + 10,
};

export default function AddEncounterModal({
  isOpen,
  onSubmit,
  onClose,
}: Props): React.ReactNode {
  return (
    <Modal isOpen={isOpen} hasCloseBtn onClose={onClose}>
      <h3>Create New Encounter</h3>
      <p>form goes here</p>
      <footer>
        <button type="button" className="secondary">
          Cancel
        </button>
        <button type="button" onClick={() => onSubmit(testEncounter)}>
          Create
        </button>
      </footer>
    </Modal>
  );
}
