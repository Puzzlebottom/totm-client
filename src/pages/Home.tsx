import { useQuery } from '@tanstack/react-query';
import axios from 'redaxios';
import { useState } from 'react';
import { APIResponse } from '../interfaces/APIResponse';

function Home() {
  const [search, setSearch] = useState('');
  const [searchURL, setSearchURL] = useState('');

  const {
    isFetching,
    error,
    data: results,
  } = useQuery({
    queryKey: ['search', searchURL],
    queryFn: async () => {
      const { data } = await axios.get(searchURL);
      return data as APIResponse;
    },
    enabled: !!searchURL,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchURL(`https://nature-image-api.vercel.app/search?q=${search}`);
  };

  return (
    <main className="container">
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          Search
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            id="search"
          />
        </label>
        <button type="submit">SEARCH</button>
      </form>
      {isFetching && <progress />}
      {error && (
        <article>
          <h3>{error.message}</h3>
        </article>
      )}
      <div style={{ columnCount: 3 }}>
        {results &&
          results.images.map((result) => (
            <article key={result.image}>
              <img src={result.image} alt={result.title} />
              <h4 style={{ textAlign: 'center' }}>{result.title}</h4>
            </article>
          ))}
      </div>
    </main>
  );
}

export default Home;
