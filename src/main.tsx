import ReactDOM from 'react-dom/client';
import { PlanetsProvider } from './contexts/PlanetsContext';
import { FilmsProvider } from './contexts/FilmesContext';
import { PeopleProvider } from './contexts/PeopleContext';
import { LoadingProvider } from './contexts/LoadingContext';
import LightsaberLoader from './components/LightSaberLoader/LightSaberLoader';
import GlobalStyle from './GlobalStyle';
import App from './App';

const AppWrapper = () => (
  // <React.StrictMode>
  <LoadingProvider>
    <LightsaberLoader />
    <PlanetsProvider>
      <GlobalStyle />
      <FilmsProvider>
        <PeopleProvider>
          <App />
        </PeopleProvider>
      </FilmsProvider>
    </PlanetsProvider>
  </LoadingProvider>
  // </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppWrapper />
);




