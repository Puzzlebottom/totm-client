import { FaPlus } from 'react-icons/fa';

import useEncounters from '../hooks/useEncounters';
import EncounterSearchBar from '../components/EncounterSearchBar';
import useModal from '../hooks/useModal';
import AddEncounterModal from '../components/AddEncounterModal';
import EditEncounterModal from '../components/EditEncounterModal';
import SelectEncounterModal from '../components/SelectEncounterModal';
import EncounterCard from '../components/EncounterCard';

function Home() {
  const {
    encounters,
    displayedEncounters,
    selectedEncounter,
    addEncounter,
    updateEncounter,
    deleteEncounter,
    selectEncounter,
    filterEncounters,
    runEncounter,
  } = useEncounters();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal(false);
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal(false);
  const [isSelectModalOpen, openSelectModal, closeSelectModal] =
    useModal(false);

  const handleEdit = (): void => {
    closeSelectModal();
    openEditModal();
  };

  const handleSelect = (encounterId: number): void => {
    openSelectModal();
    selectEncounter(encounterId);
  };

  return (
    <main className="container">
      <EncounterSearchBar
        data={encounters}
        filterEncounters={filterEncounters}
        selectEncounter={handleSelect}
      />
      <button type="button" aria-label="add encounter" onClick={openAddModal}>
        <FaPlus />
      </button>
      {displayedEncounters
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((encounter) => (
          <EncounterCard
            key={encounter.id}
            encounter={encounter}
            selectEncounter={() => handleSelect(encounter.id)}
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
        editEncounter={handleEdit}
        runEncounter={runEncounter}
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
