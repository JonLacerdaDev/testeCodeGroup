import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoading } from './LoadingContext';

import { Person, PeopleContextType, PeopleProviderProps } from '../types/People';

const PeopleContext = createContext<PeopleContextType>({ people: [] });

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }: PeopleProviderProps) => {
  const [people, setPeople] = useState<Person[]>([]);
  const { updateProgress } = useLoading();
  const accessedPages = new Set<string>(); 

  const fetchAllPeople = async () => {
    let allPeople: Person[] = [];
    let nextPage = 'https://swapi.dev/api/people/';
    let numberPage = 0;
    let totalCount = 0;

    try {
      while (nextPage) {
        if (accessedPages.has(nextPage)) {
          break; 
        }
        numberPage++;
        const response = await fetch(nextPage);
        const data = await response.json();
        
        allPeople = [...allPeople, ...data.results];
        accessedPages.add(nextPage); 
        nextPage = data.next;
        
        totalCount = data.count;

        if (window.location.pathname.includes('/planet/')) {
          const progress = (numberPage / Math.ceil(totalCount / 10)) * 100;
          updateProgress(progress);
        }
      }
    } catch (error) {
      console.error('Error fetching people:', error);
      toast.error('Error fetching people - See console for more datails', {
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

    setPeople(allPeople);
  };

  useEffect(() => {
    fetchAllPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people }}>
      {children}
    </PeopleContext.Provider>
  );
};
