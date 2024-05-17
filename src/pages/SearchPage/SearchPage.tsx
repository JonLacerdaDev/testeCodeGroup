import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlanets } from '../../contexts/PlanetsContext';
import PlanetImage, { hasValidImage } from '../../components/PlanetImage/PlanetImage';
import { PlanetContainer, SearchTerm, Item } from './SearchPageStyle'

const SearchPage = () => {
  const { term } = useParams<{ term: string }>();
  const { planets } = usePlanets();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (!term) return;

    const filteredResults = planets
      .filter((planet) => planet.name && planet.name.toLowerCase().includes(term.toLowerCase()))
      .map((planet) => ({
        name: planet.name,
        link: `/planet/${planet.name}`,
        hasImage: hasValidImage(planet.name),
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
    <>
      <SearchTerm>
        You searched for: <span>{term}</span>
      </SearchTerm>
      <PlanetContainer>
        {searchResults.map((result, index) => (
          <Link to={result.link} key={index}>
            <Item>
              <PlanetImage planetName={result.name} />
              <span>Planet:</span>
              <p>{result.name}</p>
            </Item>
          </Link>
        ))}
      </PlanetContainer>
    </>
  );
};

export default SearchPage;
