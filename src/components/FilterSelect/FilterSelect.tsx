import { FilterContainer } from './FilterSelectStyle';

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder: string;
}

const FilterSelect: React.FC<Props> = ({ value, onChange, options, placeholder }) => {
  return (
    <FilterContainer>
      <select value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};

export default FilterSelect;
