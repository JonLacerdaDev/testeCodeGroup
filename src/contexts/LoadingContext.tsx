import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [fiftyPercentWarningShown, setFiftyPercentWarningShown] = useState(false);
  const [eightyPercentWarningShown, setEightyPercentWarningShown] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
    setFiftyPercentWarningShown(false);
    setEightyPercentWarningShown(false);

    setTimeout(() => {
      if (progress < 50 && !fiftyPercentWarningShown) {
        toast.error('Calma lá, jovem padawan! Estamos processando a força. Isso pode levar alguns segundos...', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setFiftyPercentWarningShown(true);
      }
    }, 5000);

    setTimeout(() => {
      if (progress < 80 && !eightyPercentWarningShown) {
        toast.error('Ops! Parece que a força falhou desta vez. Por favor, recarregue a página e vamos tentar de novo!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
        setEightyPercentWarningShown(true);
      }
    }, 10000);
  };

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  const finishLoading = () => {
    setProgress(100);
    setLoading(false);
  };

  useEffect(() => {
    if (progress >= 50) {
      setFiftyPercentWarningShown(true);
    }
    if (progress >= 80) {
      setEightyPercentWarningShown(true);
    }
  }, [progress]);

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
