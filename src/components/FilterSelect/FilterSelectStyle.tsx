import styled from 'styled-components';
import IcoArrow from '../../assets/ico-select.png';

export const FilterContainer = styled.div`
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    padding-left: 20px;
    border: none;
    font-size: 14px;
    color: #fff; 
    cursor: pointer;
    width: 88px;
    display: flex;
    background-image: url(${IcoArrow});
    background-repeat: no-repeat;
    background-position: left 8px;
    outline: none;
    white-space: nowrap;                  
    overflow: hidden; 
    text-overflow: ellipsis;

    @media only screen and (min-width: 768px) {
      width: 100px;
    }

    option {
      color: #000;
    }
  }
`;
