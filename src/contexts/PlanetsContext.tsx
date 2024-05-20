import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSWAPIEndpoint, SWAPIRoutes } from '../utils/swapi';
import { useLoading } from './LoadingContext';
import { ToastContainer, toast } from 'react-toastify';

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
  const [ planets, setPlanets ] = useState<Planet[]>([]);
  const [ totalCount, setTotalCount ] = useState<number>(0);
  const { updateProgress } = useLoading();

  useEffect(() => {
    const fetchAllPlanets = async () => {
      try {
        const allPlanets: Planet[] = [];
        let nextUrl = getSWAPIEndpoint(SWAPIRoutes.Planets);
        let numberPage = 0;

        while (nextUrl) {
          numberPage++;
          const response = await fetch(nextUrl);
          const data = await response.json();
          allPlanets.push(...data.results);
          nextUrl = data.next;

          if (allPlanets.length === data.results.length) {
            setTotalCount(data.count / 10);
          }

          if (!window.location.pathname.includes('/planet/')) {
            updateProgress(numberPage > totalCount ? 100 : numberPage * 10);
          } 
        }

        setPlanets(allPlanets);
      } catch (error) {
        console.error('Error fetching all planets:', error);
        toast.error('Error fetching all planets - See console for more datails', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      }
    };

    fetchAllPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={{ planets }}>
      <ToastContainer/>
      {children}
    </PlanetsContext.Provider>
  );
};
