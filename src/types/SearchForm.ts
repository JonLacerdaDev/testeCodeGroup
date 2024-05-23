import { Planet } from './Planets';

export interface FormInputs {
  searchTerm: string;
  selectedPlanet: string;
  selectedPopulation: string;
}

export interface SearchFormProps {
  planets: Planet[];
  onSubmit: (searchTerm: string) => void;
}