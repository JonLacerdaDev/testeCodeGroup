export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  films: string[];
  residents: string[];
}

export interface PlanetsContextType {
  planets: Planet[];
}

export interface PlanetsProviderProps {
  children: React.ReactNode;
}

export type PlanetName =
  | 'tatooine'
  | 'naboo'
  | 'mustafar'
  | 'kashyyyk'
  | 'hoth'
  | 'endor'
  | 'dagobah'
  | 'coruscant'
  | 'bespin'
  | 'alderaan';

  export interface PlanetImageProps {
  planetName: PlanetName;
  className?: string;
}
