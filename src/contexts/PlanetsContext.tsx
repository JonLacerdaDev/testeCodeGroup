import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSWAPIEndpoint, SWAPIRoutes } from '../utils/swapi';
import { useLoading } from './LoadingContext';

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
  const [totalCount, setTotalCount] = useState<number>(0);
  const { updateProgress, setPlanetsLoadingComplete } = useLoading();

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

          if (allPlanets.length === data.results.length) {
            setTotalCount(data.count);
          }

          updateProgress(data.count * 100);
        }

        setPlanets(allPlanets);
        setPlanetsLoadingComplete();
      } catch (error) {
        console.error('Error fetching all planets:', error);
      }
    };

    fetchAllPlanets();
  }, [totalCount, updateProgress, setPlanetsLoadingComplete]);

  return (
    <PlanetsContext.Provider value={{ planets }}>
      {children}
    </PlanetsContext.Provider>
  );
};
