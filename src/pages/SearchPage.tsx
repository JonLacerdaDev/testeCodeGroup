import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';
import PlanetImage from '../components/PlanetImage/PlanetImage';

const SearchPage = () => {
  const { term } = useParams<{ term: string }>();
  const { planets } = usePlanets();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const filteredResults = planets
      .filter(planet => planet.name.toLowerCase().includes(term?.toLowerCase()))
      .map(planet => ({
        name: planet.name,
        link: `/planet/${planet.name}`,
        hasImage: planet.image !== 'planet-image-not-found.png' 
      }))
      .sort((a, b) => {
        if (a.hasImage && !b.hasImage) {
          return -1;
        }
        if (!a.hasImage && b.hasImage) {
          return 1;
        }
        return 0;
      });

    setSearchResults(filteredResults);
  }, [term, planets]);

  return (
    <div>
      <h1>Search Page</h1>
      <h2>Search Term: {term}</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <PlanetImage planetName={result.name} /> 
            <Link to={result.link}>{result.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
