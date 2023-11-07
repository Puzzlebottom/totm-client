import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import AddEncounterModal from '../components/AddEncounterModal';
import useEncounters from '../hooks/useEncounters';
import '../styles/home.css';
import EncounterSearchBar from '../components/EncounterSearchBar';

function Home() {
  const { encounters, addEncounter } = useEncounters();

  const [isAddEncounterModelOpen, setIsEncounterModalOpen] =
    useState<boolean>(false);

  const handleOpenNewEncounterModal = () => {
    setIsEncounterModalOpen(true);
  };

  const handleCloseNewEncounterModal = () => {
    setIsEncounterModalOpen(false);
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
          <article key={encounter.id}>
            <header>
              <strong>{encounter.name}</strong>
            </header>
            <p>{encounter.description}</p>
          </article>
        ))}
      <AddEncounterModal
        isOpen={isAddEncounterModelOpen}
        onSubmit={addEncounter}
        onClose={handleCloseNewEncounterModal}
      />
    </main>
  );
}

export default Home;
