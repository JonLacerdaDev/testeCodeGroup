import { useNavigate } from 'react-router-dom';
import { usePlanets } from '../../contexts/PlanetsContext';
import SearchForm from '../../components/SearchForm/SearchForm';

const Home = () => {
  const { planets } = usePlanets();
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm:string) => {
    const selectedPlanet = planets.find((planet) => planet.name.toLowerCase() === searchTerm.toLowerCase());
    const searchUrl = selectedPlanet ? `/planet/${selectedPlanet.name}` : `/search/${searchTerm}`;
    navigate(searchUrl);
  };

  return <SearchForm planets={planets} onSubmit={handleSearchSubmit} />;
};

export default Home;
