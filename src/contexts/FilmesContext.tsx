import React, { createContext, useContext, useState, useEffect } from 'react';

interface Film {
  title: string;
  url: string;
}
const FilmsContext = createContext([]);

export const useFilms = () => useContext(FilmsContext);

interface FilmsProviderProps {
  children: React.ReactNode;
}

export const FilmsProvider = ({ children }:FilmsProviderProps) => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FilmsContext.Provider value={films}>
      {children}
    </FilmsContext.Provider>
  );
};
