
// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { PlanetsProvider } from './contexts/PlanetsContext';
import { FilmsProvider } from './contexts/FilmesContext.tsx';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <PlanetsProvider>
      <FilmsProvider>
        <App/>
      </FilmsProvider>
    </PlanetsProvider>
  // </React.StrictMode>,
)
