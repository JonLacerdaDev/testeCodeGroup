import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoadingContextProps } from '../types/Loading';

import 'react-toastify/dist/ReactToastify.css';

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [ loading, setLoading ] = useState(true);
  const [ progress, setProgress ] = useState(0);
  const [ fiftyPercentWarningShown, setFiftyPercentWarningShown ] = useState(false);
  const [ eightyPercentWarningShown, setEightyPercentWarningShown ] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setProgress(0);
    setFiftyPercentWarningShown(false);
    setEightyPercentWarningShown(false);

    setTimeout(() => {
      if (progress < 50 && !fiftyPercentWarningShown) {
        toast.error('Easy there, young padawan! We are suing by force. This may take a few seconds...', {
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
        toast.error("Oops! It seems that the force has failed this time. Please reload the page and let's try again!", {
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
