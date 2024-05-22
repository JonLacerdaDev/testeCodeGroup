import React, { forwardRef } from 'react';
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
  onClick?: (event: React.MouseEvent<HTMLSelectElement>) => void;
}

const FilterSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => {
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
