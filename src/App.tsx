import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PlanetDetailPage from './pages/PlanetDetailPage';
import Parallax from './components/Parallax/Parallax';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Parallax/>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search/:term" element={<SearchPage/>} />
          <Route path="/planet/:urlPlanetName" element={<PlanetDetailPage/>} />
        </Routes>
      </Router>
      <Footer/>
    </>
  );
};

export default App;
