import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getSWAPIEndpoint, SWAPIRoutes } from '../utils/swapi';
import { useLoading } from './LoadingContext';
import { toast } from 'react-toastify';
import { Planet, PlanetsContextType, PlanetsProviderProps } from '../types/Planets';

const PlanetsContext = createContext<PlanetsContextType>({
  planets: []
});

export const usePlanets = () => useContext(PlanetsContext);

export const PlanetsProvider = ({ children }: PlanetsProviderProps) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const { updateProgress } = useLoading();
  const dataFetchedRef = useRef(false);
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      let timeoutHandled = false;

      const timeout = setTimeout(() => {
        if (!toastShownRef.current && !timeoutHandled) {
          toast.error("It's taking a long time to load, unfortunately the data API is slower than we would like", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
          });
          toastShownRef.current = true;
        }
      }, 10000);

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

          if (numberPage === 1) {
            setTotalCount(Math.ceil(data.count / 10));
          }

          if (!window.location.pathname.includes('/planet/')) {
            const totalDivider = totalCount || 10;
            updateProgress((numberPage / totalDivider) * 100);
          }
        }

        setPlanets(allPlanets);
        if (!window.location.pathname.includes('/planet/')) {
          updateProgress(100);
        }
      } catch (error) {
        console.error('Error fetching all planets:', error);
        toast.error('Error fetching all planets - See console for more details', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      } finally {
        timeoutHandled = true;
        clearTimeout(timeout);
        toastShownRef.current = false;
      }
    };

    fetchData();
  }, [totalCount, updateProgress]);

  return (
    <PlanetsContext.Provider value={{ planets }}>
      {children}
    </PlanetsContext.Provider>
  );
};
