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
}

const PlanetsContext = createContext<PlanetsContextType>({
  planets: []
});

export const usePlanets = () => useContext(PlanetsContext);

interface PlanetsProviderProps {
  children: React.ReactNode;
}

export const PlanetsProvider: React.FC<PlanetsProviderProps> = ({ children }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        const allPlanets: Planet[] = [];
        let nextUrl = getSWAPIEndpoint(SWAPIRoutes.Planets);

        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data = await response.json();
          allPlanets.push(...data.results);
          nextUrl = data.next;
        }

        setPlanets(allPlanets);
      } catch (error) {
        console.error('Error fetching all planets:', error);
      }
    };

    fetchAllPlanets();
  }, []);

  
  return (
    <PlanetsContext.Provider value={{ planets }}>
      {children}
    </PlanetsContext.Provider>
  );
};
