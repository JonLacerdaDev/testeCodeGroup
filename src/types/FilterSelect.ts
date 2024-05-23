export interface Option {
  label: string;
  value: string;
}

export interface FilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder: string;
  onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void;
}