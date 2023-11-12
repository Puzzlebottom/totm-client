import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { Encounter } from '../interfaces/Encounter';
import useEncounters from '../hooks/useEncounters';
import EncounterSearchBar from '../components/EncounterSearchBar';
import useModal from '../hooks/useModal';
import AddEncounterModal from '../components/AddEncounterModal';
import EditEncounterModal from '../components/EditEncounterModal';
import SelectEncounterModal from '../components/SelectEncounterModal';
import EncounterCard from '../components/EncounterCard';

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
          <EncounterCard
            key={encounter.id}
            encounter={encounter}
            selectEncounter={selectEncounter}
          />
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
