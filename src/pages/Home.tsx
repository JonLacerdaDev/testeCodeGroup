import { usePlanets } from '../contexts/PlanetsContext';

const Home = () => {
  const { planetNames, populations } = usePlanets();

  console.log('Planet Names:', planetNames);
  console.log('Populations:', populations);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
