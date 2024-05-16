import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSWAPIEndpoint, SWAPIRoutes } from '../utils/swapi';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  films: string[];
  residents: string[];
}

interface PlanetsContextType {
  planets: Planet[];
  planetNames: string[]; 
  populations: string[]; 
  fetchPlanets: () => void;
}

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  planetNames: [],
  populations: [],
  fetchPlanets: () => {},
});

export const usePlanets = () => useContext(PlanetsContext);

interface PlanetsProviderProps {
  children: React.ReactNode;
}

export const PlanetsProvider: React.FC<PlanetsProviderProps> = ({ children }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [planetNames, setPlanetNames] = useState<string[]>([]); 
  const [populations, setPopulations] = useState<string[]>([]); 
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const fetchPlanets = async () => {
    try {
      const endpoint = getSWAPIEndpoint(SWAPIRoutes.Planets);
      const response = await fetch(endpoint);
      const data = await response.json();
      const fetchedPlanets = data.results;
      
      const planetNamesArray = fetchedPlanets.map((planet: Planet) => planet.name);
      const populationsArray = fetchedPlanets.map((planet: Planet) => planet.population);

      setPlanets(fetchedPlanets);
      setPlanetNames(planetNamesArray);
      setPopulations(populationsArray);

      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetchPlanets();
    }
  }, []); 

  return (
    <PlanetsContext.Provider value={{ planets, planetNames, populations, fetchPlanets }}>
      {children}
    </PlanetsContext.Provider>
  );
};
