import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';
import PlanetImage from '../components/PlanetImage/PlanetImage';
import styled from 'styled-components';

const PlanetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;

  a {
    flex: 0 0 calc(30% - 20px);
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    text-align: center;
    text-decoration: none;
    transition: all .2s;

    &:hover {
      background-color: #909090;
    }
  }
`;

const Item = styled.div`
  img {
    max-width: 150px;
  }

  span {
    font-size: 14px;
    font-weight: 300;
    color: #000;
    display: block;
    margin-top: 15px;
  }

  p {
    display: block;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(100% - 20px);
  }
`;


const SearchTerm = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #000;
  text-align: center;
  background: #fff;
  margin-bottom: 15px;
  display: block;
  padding: 15px;

  span {
    color: #DE1212;
  }
`

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
    <>
      <SearchTerm>You searched for: <span>{term}</span></SearchTerm>
      <PlanetContainer>
        {searchResults.map((result, index) => (
          <Link to={result.link}>
            <Item key={index}>
              <PlanetImage planetName={result.name} /> 
              <span>
                Planet:
              </span>
              <p>
                {result.name}
              </p>
            </Item>
          </Link>
        ))}
      </PlanetContainer>
    </>
  );
};

export default SearchPage;
