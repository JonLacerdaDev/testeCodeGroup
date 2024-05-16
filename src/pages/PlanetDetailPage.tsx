import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';
import { useFilms } from '../contexts/FilmesContext'; 

const PlanetDetailPage = () => {
  const { urlPlanetName } = useParams<{ urlPlanetName: string }>();
  const { planets } = usePlanets();
  const films = useFilms(); 
  const [planet, setPlanet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPlanetName, setNewPlanetName] = useState<string>('');
  const [planetImage, setPlanetImage] = useState<string>('');

  useEffect(() => {
    const planetNameFromURL = urlPlanetName?.toLowerCase();
    const matchedPlanet = planets.find((planet: any) => {
      return planet.name.toLowerCase().includes(planetNameFromURL);
    });

    if (matchedPlanet) {
      setPlanet(matchedPlanet);
      const planetIndex = planets.findIndex((p: any) => p.name === matchedPlanet.name);
      const planetImageLink = `https://cryptospro.com.br/planetas/planeta_${('0000' + planetIndex).slice(-4)}_${matchedPlanet.name.toLowerCase()}.png`;
      setPlanetImage(planetImageLink);
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
      <Link to='/'>home</Link>
      <h1>Planet Detail Page</h1>
      <img src={planetImage} alt={planet.name} />
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
          // Encontre o título do filme com base na URL usando o contexto dos filmes
          <li key={index}>{films.find((f: any) => f.url === film)?.title || 'Unknown'}</li>
        ))}
      </ul>
      <p>Number of Films: {planet.films.length}</p>
      {planet.residents.length > 0 && (
        <div>
          <p>Residents:</p>
          <ul>
            {planet.residents.map((resident: string, index: number) => (
              <li key={index}>{resident}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanetDetailPage;
