import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage/SearchPage';
import PlanetDetailPage from './pages/PlanetDetail/PlanetDetailPage';
import Parallax from './components/Parallax/Parallax';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './pages/NotFound/NotFound';

import { SpeedInsights } from "@vercel/speed-insights/react"
import { inject } from '@vercel/analytics';

const App = () => {
  inject();
  return (
    <>
      <SpeedInsights />
      <Parallax/>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search/:term" element={<SearchPage/>} />
          <Route path="/planet/:urlPlanetName" element={<PlanetDetailPage/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};

export default App;
