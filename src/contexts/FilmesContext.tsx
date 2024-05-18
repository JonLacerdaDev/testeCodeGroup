import { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';

interface Film {
  title: string;
  url: string;
}

const FilmsContext = createContext<Film[]>([]);

export const useFilms = () => useContext(FilmsContext);

interface FilmsProviderProps {
  children: React.ReactNode;
}

export const FilmsProvider = ({ children }: FilmsProviderProps) => {
  const [films, setFilms] = useState<Film[]>([]);
  const { updateProgress, setFilmsLoadingComplete, loading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        setFilms(data.results);
        updateProgress(50);
        setFilmsLoadingComplete();
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading, updateProgress, setFilmsLoadingComplete]);

  return (
    <FilmsContext.Provider value={films}>
      {children}
    </FilmsContext.Provider>
  );
};
