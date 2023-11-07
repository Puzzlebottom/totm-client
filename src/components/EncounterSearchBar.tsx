import { useState } from 'react';
import { Encounter } from '../interfaces/Encounter';

type Props = {
  data: Encounter[];
  callback: (result: Encounter[]) => void;
};

export default function EncounterSearchBar({ data, callback }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
    callback(result);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchValue}
        placeholder="Search encounters"
        onChange={handleChange}
        aria-label="search encounters"
      />
    </form>
  );
}
