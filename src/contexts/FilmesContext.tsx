import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Film, FilmsProviderProps } from '../types/Films'

const FilmsContext = createContext<Film[]>([]);

export const useFilms = () => useContext(FilmsContext);

export const FilmsProvider = ({ children }:FilmsProviderProps) => {
  const [films, setFilms] = useState<Film[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      setFilms(data.results);
    } catch (error) {
      console.error('Error fetching films:', error);
      toast.error('Error fetching films - See console for more datails', {
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

  useEffect(() => {
    fetchData(); 
  }, []); 

  return (
    <FilmsContext.Provider value={films}>
      {children}
    </FilmsContext.Provider>
  );
};
