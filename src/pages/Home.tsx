import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';

const Home = () => {
  const { planets } = usePlanets();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [selectedPopulation, setSelectedPopulation] = useState<string>('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (selectedPlanet || planets.some(planet => planet.name.toLowerCase() === searchTerm.toLowerCase())) {
      navigate(`/planet/${selectedPlanet || searchTerm}`);
    } else {
      let searchUrl = `/search/${searchTerm}`;
      navigate(searchUrl);
    }
  };

  const filteredPlanets = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const relevantPopulations = planets.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    ? planet.population 
    : ''
  );
  
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={e => { e.preventDefault(); handleSearchSubmit(); }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search..."
          autoComplete="off"
        />

        <select value={selectedPlanet} onChange={e => setSelectedPlanet(e.target.value)}>
          <option value="">Select Planet</option>
          {filteredPlanets.map((planet, index) => (
            <option key={index} value={planet.name}>{planet.name}</option>
          ))}
        </select>

        <select value={selectedPopulation} onChange={e => setSelectedPopulation(e.target.value)}>
          <option value="">Select Population</option>
          {relevantPopulations.map((planet, index) => (
            <option key={index} value={planet.name}>{planet.population}</option>
          ))}
        </select>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
