import { useState, useEffect } from 'react';
import ImageForm from '../../assets/image-form.png';
import ImageFormMobile from '../../assets/image-form-mobile.png';
import ImageSpaceship from '../../assets/spaceship.png';
import IcoFilter from '../../assets/ico-filter.png';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { 
  FormContainer, 
  FormContent, 
  ImageContainer, 
  TitleForm, 
  SearchButton,
  SuggestionContainer,
  SuggestionContent,
  TabSuggestion,
  FiltersContainer,
  FiltersTitle,
  FiltersWrapper,
  InputSearch
} from './SearchFormStyle';

interface Planet {
  name: string;
  population: string;
}

interface Props {
  planets: Planet[];
  onSubmit: (searchTerm: string) => void;
}

const SearchForm = ({ planets, onSubmit }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [selectedPopulation, setSelectedPopulation] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm && !selectedPlanet) {
      toast.error('Please type something in the field or select a planet', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    } else {
      onSubmit(searchTerm || selectedPlanet);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const mostSimilarPlanet = planets
      .filter((planet) => planet.name.toLowerCase().startsWith(value.toLowerCase()))
      .sort((a, b) => a.name.length - b.name.length)
      .map((planet) => planet.name)
      .shift();

    setSuggestion(mostSimilarPlanet || null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab' && suggestion) {
      event.preventDefault();
      setSearchTerm(suggestion);
      setSuggestion(null);
    }
  };

  const handlePopulationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const population = event.target.value;
    setSelectedPopulation(population);
  };

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPopulation === '' || (selectedPopulation === 'unknown' && planet.population === 'unknown') || (selectedPopulation !== 'unknown' && planet.population !== 'unknown'))
  );

  const populationOptions = [
    ...new Set(planets.map(planet => planet.population === 'unknown' ? 'unknown' : planet.population).filter(population => population !== 'unknown')),
    'unknown'
  ].map(population => ({
    label: population === 'unknown' ? 'Unknown' : Number(population).toLocaleString(),
    value: population
  }));

  useEffect(() => {
    if (!searchTerm) {
      setSuggestion(null);
    }
  }, [searchTerm]);

  return (
    <FormContainer onSubmit={handleSearchSubmit}>
      <ImageContainer>
        <img src={ImageForm} alt="Image Form" className='desktop-only'/>
        <img src={ImageFormMobile} alt="Image Form" className='mobile-only'/>
        <img src={ImageSpaceship} alt="Spaceship" className="parallax-layer spaceship" data-depth="1.3" />
      </ImageContainer>
      <FormContent>
        <TitleForm>
          Discover all the information <br />
          about Planets of the Star <br /> Wars Saga
        </TitleForm>
        <SuggestionContainer>
          <InputSearch
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter the name in the planet"
            autoComplete="off"
          />
          {suggestion && (
            <>
              <SuggestionContent>
                <span>{searchTerm}</span>
                <span style={{ opacity: 0.5 }}>{suggestion.substring(searchTerm.length)}</span>
              </SuggestionContent>
              <TabSuggestion />
            </>
          )}
        </SuggestionContainer>
        <SearchButton type="submit">
          Search
        </SearchButton>
        <FiltersContainer>
          <FiltersTitle>
            <img src={IcoFilter} alt="Filter Icon" />
            <span>Filter:</span>
          </FiltersTitle>
          <FiltersWrapper>
            <FilterSelect
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
              options={filteredPlanets.map((planet) => ({ label: planet.name, value: planet.name }))}
              placeholder="Name"
            />
            <FilterSelect
              value={selectedPopulation}
              onChange={handlePopulationChange}
              options={populationOptions}
              placeholder="Population"
            />
          </FiltersWrapper>
        </FiltersContainer>
      </FormContent>
      <ToastContainer />
    </FormContainer>
  );
};

export default SearchForm;
