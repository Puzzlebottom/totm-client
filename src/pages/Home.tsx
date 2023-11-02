// import { useQuery } from '@tanstack/react-query';
// import axios from 'redaxios';
// import { useState } from 'react';

import { Encounter } from '../interfaces/Encounter';

// import { APIResponse } from '../interfaces/APIResponse';
interface Props {
  encounters: Encounter[];
}

function Home({ encounters }: Props) {
  // const [search, setSearch] = useState('');
  // const [searchURL, setSearchURL] = useState('');

  // const {
  //   isFetching,
  //   error,
  //   data: results,
  // } = useQuery({
  //   queryKey: ['search', searchURL],
  //   queryFn: async () => {
  //     const { data } = await axios.get(searchURL);
  //     return data as APIResponse;
  //   },
  //   enabled: !!searchURL,
  // });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSearchURL(`https://nature-image-api.vercel.app/search?q=${search}`);
  // };

  return (
    <main>
      {encounters.map((encounter) => (
        <article key={encounter.id}>
          <header>{encounter.name}</header>
          <p>{encounter.description}</p>
        </article>
      ))}
    </main>
  );
}

export default Home;
