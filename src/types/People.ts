export type Person = {
  name: string;
  url: string;
};

export type PeopleContextType = {
  people: Person[];
};

export interface PeopleProviderProps {
  children: React.ReactNode;
}
