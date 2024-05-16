import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';

const PlanetDetailPage = () => {
  const { urlPlanetName } = useParams<{ urlPlanetName: string }>();
  const { planets } = usePlanets();
  const [planet, setPlanet] = useState<any>(null);

  useEffect(() => {
    const planetNameFromURL = urlPlanetName?.toLowerCase();
    const matchedPlanet = planets.find((planet: any) => {
      return planet.name.toLowerCase().includes(planetNameFromURL)
    }
    );

    console.log(matchedPlanet)
    if (matchedPlanet) {
      setPlanet(matchedPlanet);
    }
  }, [urlPlanetName, planets]);

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
      <h2>Name: {planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Terrain: {planet.terrain}</p>
    </div>
  );
};

export default PlanetDetailPage;
