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
  fetchPlanets: () => void;
}

const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  fetchPlanets: () => {},
});

export const usePlanets = () => useContext(PlanetsContext);

interface PlanetsProviderProps {
  children: React.ReactNode;
}

export const PlanetsProvider: React.FC<PlanetsProviderProps> = ({ children }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const fetchPlanets = async () => {
    try {
      const endpoint = getSWAPIEndpoint(SWAPIRoutes.Planets);
      const response = await fetch(endpoint);
      const data = await response.json();
      
      setPlanets(data.results);
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
    <PlanetsContext.Provider value={{ planets, fetchPlanets }}>
      {children}
    </PlanetsContext.Provider>
  );
};
