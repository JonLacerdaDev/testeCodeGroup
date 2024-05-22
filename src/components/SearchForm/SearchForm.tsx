import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import ImageForm from '../../assets/image-form.png';
import ImageFormMobile from '../../assets/image-form-mobile.png';
import ImageSpaceship from '../../assets/spaceship.png';
import IcoFilter from '../../assets/ico-filter.png';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { ToastContainer, toast } from 'react-toastify';
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

interface FormInputs {
  searchTerm: string;
  selectedPlanet: string;
  selectedPopulation: string;
}

interface Props {
  planets: Planet[];
  onSubmit: (searchTerm: string) => void;
}

const SearchForm = ({ planets, onSubmit }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormInputs>();
  const searchTerm = watch('searchTerm');
  const selectedPlanet = watch('selectedPlanet');
  const selectedPopulation = watch('selectedPopulation');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleSearchSubmit = handleSubmit((data: FormInputs) => {
    if (!data.searchTerm && !data.selectedPlanet) {
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
      onSubmit(data.searchTerm || data.selectedPlanet);
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue('searchTerm', value);
    setValue('selectedPlanet', ''); 

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
      setValue('searchTerm', suggestion);
      setSuggestion(null);
    }
  };

  const handlePopulationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const population = event.target.value;
    setValue('selectedPopulation', population);
  };

  const filteredPlanets = useMemo(() => {
    return planets.filter((planet) => {
      const matchesName = planet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPopulation = selectedPopulation === '' || (selectedPopulation === 'unknown' ? planet.population === 'unknown' : planet.population !== 'unknown' && planet.population === selectedPopulation);
      return matchesName && matchesPopulation;
    });
  }, [planets, searchTerm, selectedPopulation]);

  const populationOptions = useMemo(() => {
    return [
      ...new Set(planets.map(planet => planet.population === 'unknown' ? 'unknown' : planet.population).filter(population => population !== 'unknown')),
      'unknown'
    ].map(population => ({
      label: population === 'unknown' ? 'Unknown' : Number(population).toLocaleString(),
      value: population
    }));
  }, [planets]);

  useEffect(() => {
    if (!searchTerm) {
      setSuggestion(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (selectedPlanet) {
      setValue('searchTerm', selectedPlanet);
    }
  }, [selectedPlanet]);

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
            {...register('searchTerm')}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter the name in the planet"
            autoComplete="off"
          />
          {suggestion && (
            <div className='desktop-only'>
              <SuggestionContent>
                <span>{searchTerm}</span>
                <span style={{ opacity: 0.5 }}>{suggestion.substring(searchTerm.length)}</span>
              </SuggestionContent>
              <TabSuggestion>
                Press TAB
              </TabSuggestion>
            </div>
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
              {...register('selectedPlanet')}
              value={selectedPlanet}
              onChange={(e) => {
                setValue('selectedPlanet', e.target.value);
                setValue('searchTerm', e.target.value); 
              }}
              options={filteredPlanets.map((planet) => ({ label: planet.name, value: planet.name }))}
              placeholder="Name"
            />
            <FilterSelect
              {...register('selectedPopulation')}
              value={selectedPopulation}
              onChange={handlePopulationChange}
              options={populationOptions}
              placeholder="Population"
              onClick={() => setValue('searchTerm', '')}
            />
          </FiltersWrapper>
        </FiltersContainer>
      </FormContent>
      <ToastContainer />
    </FormContainer>
  );
};

export default SearchForm;
