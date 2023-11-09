import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import AddEncounterModal from '../components/AddEncounterModal';
import useEncounters from '../hooks/useEncounters';
import useModal from '../hooks/usemodal';
import EncounterSearchBar from '../components/EncounterSearchBar';
import SelectEncounterModal from '../components/SelectEncounterModal';
import { Encounter } from '../interfaces/Encounter';
import EditEncounterModal from '../components/EditEncounterModal';

function Home() {
  const { encounters, addEncounter, updateEncounter, deleteEncounter } =
    useEncounters();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal(false);
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal(false);
  const [isSelectModalOpen, openSelectModal, closeSelectModal] =
    useModal(false);

  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(
    null
  );

  const editEncounter = () => {
    closeSelectModal();
    openEditModal();
  };

  const selectEncounter = (encounter: Encounter) => {
    setSelectedEncounter(encounter);
    openSelectModal();
  };

  const filterEncounters = (filtered: Encounter[]) => {
    if (encounters.length === 1) {
      selectEncounter(filtered[0]);
    }
  };

  return (
    <main className="container">
      <EncounterSearchBar data={encounters} callback={filterEncounters} />
      <button
        type="button"
        aria-label="add encounter"
        className="add-encounter"
        onClick={openAddModal}
      >
        <FaPlus />
      </button>
      {encounters
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((encounter) => (
          <button
            type="button"
            aria-label="encounter card"
            className="encounter-card"
            onClick={() => selectEncounter(encounter)}
            key={encounter.id}
          >
            <header>
              <strong>{encounter.name}</strong>
            </header>
            <p>{encounter.description}</p>
          </button>
        ))}
      <AddEncounterModal
        isOpen={isAddModalOpen}
        onSubmit={addEncounter}
        onClose={closeAddModal}
      />
      <SelectEncounterModal
        encounter={selectedEncounter}
        isOpen={isSelectModalOpen}
        deleteEncounter={deleteEncounter}
        editEncounter={editEncounter}
        runEncounter={() => console.log('run')}
        onClose={closeSelectModal}
      />
      <EditEncounterModal
        encounter={selectedEncounter}
        isOpen={isEditModalOpen}
        onSubmit={updateEncounter}
        onClose={closeEditModal}
      />
    </main>
  );
}

export default Home;
