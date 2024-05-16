
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { PlanetsProvider } from './contexts/PlanetsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlanetsProvider>
      <div className="App">
      </div>
    </PlanetsProvider>
  </React.StrictMode>,
)
