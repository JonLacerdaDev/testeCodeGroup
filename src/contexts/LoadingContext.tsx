import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  progress: number;
  startLoading: () => void;
  updateProgress: (value: number) => void;
  finishLoading: () => void;
  setPlanetsLoadingComplete: () => void;
  setPeopleLoadingComplete: () => void;
  setFilmsLoadingComplete: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [planetsComplete, setPlanetsComplete] = useState(false);
  const [peopleComplete, setPeopleComplete] = useState(false);
  const [filmsComplete, setFilmsComplete] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
  };

  const updateProgress = (value: number) => {
    setProgress((prev) => Math.min(prev + value, 100));
  };

  const finishLoading = () => {
    setProgress(100);
    setLoading(false);
  };

  const setPlanetsLoadingComplete = () => {
    setPlanetsComplete(true);
    if (peopleComplete && filmsComplete) {
      finishLoading();
    }
  };

  const setPeopleLoadingComplete = () => {
    setPeopleComplete(true);
    if (planetsComplete && filmsComplete) {
      finishLoading();
    }
  };

  const setFilmsLoadingComplete = () => {
    setFilmsComplete(true);
    if (planetsComplete && peopleComplete) {
      finishLoading();
    }
  };

  return (
    <LoadingContext.Provider value={{
      loading,
      progress,
      startLoading,
      updateProgress,
      finishLoading,
      setPlanetsLoadingComplete,
      setPeopleLoadingComplete,
      setFilmsLoadingComplete,
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
