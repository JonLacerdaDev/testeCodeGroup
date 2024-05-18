import { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';

type Person = {
  name: string;
  url: string;
};

type PeopleContextType = {
  people: Person[];
};

interface PeopleProviderProps {
  children: React.ReactNode;
}

const PeopleContext = createContext<PeopleContextType>({ people: [] });

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }: PeopleProviderProps) => {
  const [people, setPeople] = useState<Person[]>([]);
  const { updateProgress, setPeopleLoadingComplete, loading } = useLoading();

  const fetchAllPeople = async () => {
    let allPeople: Person[] = [];
    let nextPage = 'https://swapi.dev/api/people/';

    while (nextPage) {
      const response = await fetch(nextPage);
      const data = await response.json();
      allPeople = [...allPeople, ...data.results];
      nextPage = data.next;
    }

    setPeople(allPeople);
    setPeopleLoadingComplete();
  };

  useEffect(() => {
    if (!loading) {
      fetchAllPeople();
    }
  }, [loading]); 

  return (
    <PeopleContext.Provider value={{ people }}>
      {children}
    </PeopleContext.Provider>
  );
};
