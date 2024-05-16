import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';

const SearchPage = () => {
  const { term } = useParams<{ term: string }>();
  const { planetNames } = usePlanets();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const filteredResults = planetNames.filter(name => name.toLowerCase().includes(term?.toLowerCase()));
    setSearchResults(filteredResults);
  }, [term, planetNames]);

  return (
    <div>
      <h1>Search Page</h1>
      <h2>Search Term: {term}</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
