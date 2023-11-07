import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import AddEncounterModal from '../components/AddEncounterModal';
import useEncounters from '../hooks/useEncounters';
import '../styles/home.css';
import EncounterSearchBar from '../components/EncounterSearchBar';
import SelectEncounterModal from '../components/SelectEncounterModal';
import { Encounter } from '../interfaces/Encounter';

function Home() {
  const { encounters, addEncounter, deleteEncounter } = useEncounters();

  const [selectedEncounter, setSelectedEncounter] = useState<Encounter | null>(
    null
  );

  const [isAddEncounterModelOpen, setIsAddEncounterModalOpen] =
    useState<boolean>(false);

  const handleOpenNewEncounterModal = () => {
    setIsAddEncounterModalOpen(true);
  };

  const handleCloseNewEncounterModal = () => {
    setIsAddEncounterModalOpen(false);
  };

  const [isSelectEncounterModalOpen, setIsSelectEncounterModalOpen] =
    useState<boolean>(false);

  const handleOpenSelectEncounterModal = () => {
    setIsSelectEncounterModalOpen(true);
  };

  const handleCloseSelectEncounterModal = () => {
    setIsSelectEncounterModalOpen(false);
  };

  const handleSelectEncounter = (encounter: Encounter) => {
    setSelectedEncounter(encounter);
    setIsSelectEncounterModalOpen(true);
  };

  return (
    <main className="container">
      <EncounterSearchBar
        data={encounters}
        callback={(result) => console.log(result)}
      />
      <button
        type="button"
        aria-label="add encounter"
        className="add-encounter"
        onClick={handleOpenNewEncounterModal}
      >
        <FaPlus />
      </button>
      {encounters
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((encounter) => (
          <article key={encounter.id} aria-label="encounter">
            <button
              type="button"
              onClick={() => handleSelectEncounter(encounter)}
            >
              <header>
                <strong>{encounter.name}</strong>
              </header>
              <p>{encounter.description}</p>
            </button>
          </article>
        ))}
      <AddEncounterModal
        isOpen={isAddEncounterModelOpen}
        onSubmit={addEncounter}
        onClose={handleCloseNewEncounterModal}
      />
      <SelectEncounterModal
        encounter={selectedEncounter}
        isOpen={isSelectEncounterModalOpen}
        deleteEncounter={deleteEncounter}
        editEncounter={() => console.log('edit')}
        runEncounter={() => console.log('run')}
        onClose={handleCloseSelectEncounterModal}
      />
    </main>
  );
}

export default Home;
