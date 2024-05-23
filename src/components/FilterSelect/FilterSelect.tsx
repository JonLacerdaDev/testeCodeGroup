import { forwardRef } from 'react';
import { FilterContainer } from './FilterSelectStyle';
import { FilterProps } from '../../types/FilterSelect';

const FilterSelect = forwardRef<HTMLSelectElement, FilterProps>((props, ref) => {
  const { value, onChange, options, placeholder, onClick } = props;
  return (
    <FilterContainer>
      <select ref={ref} value={value} onChange={onChange} onClick={onClick}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
});

export default FilterSelect;
