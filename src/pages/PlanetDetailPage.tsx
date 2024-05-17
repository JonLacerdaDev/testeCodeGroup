import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';
import { useFilms } from '../contexts/FilmesContext';
import { usePeople } from '../contexts/PeopleContext'; 
import PlanetImage from '../components/PlanetImage/PlanetImage';

const PlanetDetailPage = () => {
  const { urlPlanetName } = useParams<{ urlPlanetName: string }>();
  const { planets } = usePlanets();
  const films = useFilms();
  const { people } = usePeople();
  const [planet, setPlanet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPlanetName, setNewPlanetName] = useState<string>('');

  useEffect(() => {
    const matchedPlanet = planets.find((planet: any) => {
      return planet.name.toLowerCase().includes(urlPlanetName?.toLowerCase());
    });

    if (matchedPlanet) {
      setPlanet(matchedPlanet);
    }
  }, [urlPlanetName, planets]);

  const handleNameChange = () => {
    if (newPlanetName.trim() !== '') {
      setPlanet({ ...planet, name: newPlanetName });
      setIsEditing(false);
    }
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  if (!planet) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Planet Detail Page</h1>
      <PlanetImage planetName={planet.name} />
      <h2 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
        {isEditing ? (
          <input
            type="text"
            value={newPlanetName}
            onChange={(e) => setNewPlanetName(e.target.value)}
            onBlur={handleNameChange}
            autoFocus
          />
        ) : (
          planet.name
        )}
      </h2>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Population: {planet.population}</p>
      <p>Films:</p>
      <ul>
        {planet.films.map((film: string, index: number) => (
          <li key={index}>{films.find((f: any) => f.url === film)?.title || 'Unknown'}</li>
        ))}
      </ul>
      <p>Number of Films: {planet.films.length}</p>
      {planet.residents.length > 0 && (
        <div>
          <p>Residents:</p>
          <ul>
            {planet.residents.map((resident: string, index: number) => (
              <li key={index}>{people.find((p: any) => p.url === resident)?.name || 'Unknown'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanetDetailPage;
