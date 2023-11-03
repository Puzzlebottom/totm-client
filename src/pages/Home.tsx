import { FaPlus } from 'react-icons/fa';

import dummyEncounters from '../data/encounters';
import useEncounters from '../hooks/useEncounters';
import '../styles/home.css';

function Home() {
  const { encounters, addEncounter, deleteEncounter } =
    useEncounters(dummyEncounters);

  const handleAddEncounter: (e: React.MouseEvent) => void = (e) => {
    e.preventDefault();
    addEncounter({
      id: 0,
      name: 'test',
      description: 'test',
      isActive: false,
      round: 0,
      turn: 0,
      owner: 0,
      createdAt: Date.now(),
    });
  };
  return (
    <main className="container">
      <button
        type="button"
        className="add-encounter"
        onClick={handleAddEncounter}
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
    </main>
  );
}

export default Home;
