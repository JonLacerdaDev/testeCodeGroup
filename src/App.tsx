import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PlanetDetailPage from './pages/PlanetDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/planet/:urlPlanetName" element={<PlanetDetailPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
