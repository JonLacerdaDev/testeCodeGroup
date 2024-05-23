export interface LoadingContextProps {
  loading: boolean;
  progress: number;
  startLoading: () => void;
  updateProgress: (value: number) => void;
  finishLoading: () => void;
}