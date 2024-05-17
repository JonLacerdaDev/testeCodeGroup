import React, { useState, useEffect } from 'react';
import ImageForm from '../../assets/image-form.png';
import ImageSpaceship from '../../assets/spaceship.png';
import IcoFilter from '../../assets/ico-filter.png';

import FilterSelect from '../../components/FilterSelect/FilterSelect';

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

const SearchForm: React.FC<Props> = ({ planets, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchTerm);
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

  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!searchTerm) {
      setSuggestion(null);
    }
  }, [searchTerm]);

  return (
    <FormContainer onSubmit={handleSearchSubmit}>
      <ImageContainer>
        <img src={ImageForm} alt="Image Form" />
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              options={[
                { label: 'Name', value: '' },
                ...filteredPlanets.map((planet) => ({ label: planet.name, value: planet.name })),
              ]}
              placeholder="Name"
            />
            <FilterSelect
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              options={[
                { label: 'Population', value: '' },
                ...filteredPlanets.map((planet) => ({ label: planet.population, value: planet.population })),
              ]}
              placeholder="Population"
            />
          </FiltersWrapper>
        </FiltersContainer>
      </FormContent>
    </FormContainer>
  );
};

export default SearchForm;
