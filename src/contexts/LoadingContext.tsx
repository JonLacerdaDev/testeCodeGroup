import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextProps {
  loading: boolean;
  progress: number;
  startLoading: () => void;
  updateProgress: (value: number) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
  };

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  const finishLoading = () => {
    setProgress(100);
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, progress, startLoading, updateProgress, finishLoading }}>
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
