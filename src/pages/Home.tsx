import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';

const Home = () => {
  const { planets } = usePlanets();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [selectedPopulation, setSelectedPopulation] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string | null>(null); 
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (selectedPlanet || planets.some(planet => planet.name.toLowerCase() === searchTerm.toLowerCase())) {
      navigate(`/planet/${selectedPlanet || searchTerm}`);
    } else {
      let searchUrl = `/search/${searchTerm}`;
      navigate(searchUrl);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const mostSimilarPlanet = planets
      .filter(planet => planet.name.toLowerCase().startsWith(value.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length)
      .map(planet => planet.name)
      .shift();

    setSuggestion(mostSimilarPlanet || null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && suggestion) {
      event.preventDefault();
      setSearchTerm(suggestion);
      setSuggestion(null);
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

  useEffect(() => {
    if (!searchTerm) {
      setSuggestion(null);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={e => { e.preventDefault(); handleSearchSubmit(); }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          autoComplete="off"
        />
        {suggestion && (
          <div>
            <span>{searchTerm}</span>
            <span style={{ opacity: 0.5 }}>{suggestion.substring(searchTerm.length)}</span>
          </div>
        )}
        <select value={selectedPlanet } onChange={e => {
            setSelectedPlanet(e.target.value);
            setSearchTerm(e.target.value);
          }
        }>
          <option value="">Select Planet</option>
          {filteredPlanets.map((planet, index) => (
            <option key={index} value={planet.name}>{planet.name}</option>
          ))}
        </select>

        <select value={selectedPopulation} onChange={e => {
                setSelectedPopulation(e.target.value);
                setSearchTerm(e.target.value);
              }
            }>
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
