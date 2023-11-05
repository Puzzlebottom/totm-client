import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import AddEncounterModal from '../components/AddEncounterModal';
import useEncounters from '../hooks/useEncounters';
import '../styles/home.css';

import dummyEncounters from '../data/encounters';

function Home() {
  const { encounters, addEncounter, deleteEncounter } =
    useEncounters(dummyEncounters);

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
      <button
        type="button"
        className="add-encounter"
        data-target="modal-add-encounter"
        onClick={handleOpenNewEncounterModal}
      >
        <FaPlus />
      </button>
      {encounters
        .sort((a, b) => a.createdAt - b.createdAt)
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
