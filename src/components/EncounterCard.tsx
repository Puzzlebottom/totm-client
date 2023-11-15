import { Encounter } from '../interfaces/Encounter';

type Props = {
  encounter: Encounter;
  selectEncounter: (encounter: Encounter) => void;
};

export default function EncounterCard({
  encounter,
  selectEncounter,
}: Props): React.ReactNode {
  return (
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
  );
}
