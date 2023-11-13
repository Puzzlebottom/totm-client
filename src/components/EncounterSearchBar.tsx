import { useEffect, useRef, useState } from 'react';
import { Encounter } from '../interfaces/Encounter';
import Trie from '../utilities/Trie';

type Props = {
  data: Encounter[];
  filterEncounters: (result: Encounter[]) => void;
  selectEncounter: (encounterId: number) => void;
};

export default function EncounterSearchBar({
  data,
  filterEncounters,
  selectEncounter,
}: Props) {
  const index = useRef(new Trie());
  const [searchValue, setSearchValue] = useState('');
  const [autocompleteValue, setAutocompleteValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    if (e.target.value === '') {
      setAutocompleteValue('');
      return;
    }

    const suggestions = index.current.findSuggestions(e.target.value);
    if (suggestions.length > 0) {
      setAutocompleteValue(suggestions[0]);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regexp = new RegExp(searchValue.trim().toLowerCase());

    const result = data.filter((encounter) => {
      return (
        encounter.name.match(regexp) || encounter.description.match(regexp)
      );
    });

    setSearchValue('');
    filterEncounters(result);
  };

  useEffect(() => {
    data.forEach((encounter) => {
      index.current.insert(encounter.name);
    });
    console.log(index);
  }, [data]);

  return (
    <form onSubmit={handleSearch} aria-label="encounter search form">
      <div>
        <input
          type="text"
          value={searchValue}
          placeholder="Search encounter by name..."
          onChange={handleChange}
          className="encounter-search-input"
          aria-label="encounter search input"
        />
        <input
          type="text"
          value={autocompleteValue}
          className="encounter-search-autocomplete"
          aria-label="encounter search autocomplete"
          readOnly
          tabIndex={-1}
        />
      </div>
    </form>
  );
}
