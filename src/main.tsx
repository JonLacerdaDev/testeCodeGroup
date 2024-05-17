
import ReactDOM from 'react-dom/client'
import { PlanetsProvider } from './contexts/PlanetsContext';
import { FilmsProvider } from './contexts/FilmesContext.tsx';
import { PeopleProvider } from './contexts/PeopleContext.tsx';
import GlobalStyle from './GlobalStyle';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <PlanetsProvider>
      <GlobalStyle/>
      <FilmsProvider>
        <PeopleProvider>
          <App/>
        </PeopleProvider>
      </FilmsProvider>
    </PlanetsProvider>
  // </React.StrictMode>,
)
