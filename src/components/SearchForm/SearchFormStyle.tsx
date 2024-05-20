import styled from 'styled-components';

import icoSearch from '../../assets/ico-search.png'
import icoTab from '../../assets/ico-tab.png'

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 75%; 
  max-width: 800px; 
  margin: 0 auto 100px;
  background-color: rgba(0,0,0,.7);
  border-radius: 15px;

  @media (min-width: 768px) {
    width: 800px; 
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%; 
    display: block;
  }

  @media (min-width: 768px) {
    width: 50%; 
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 25px;
  
  @media (min-width: 768px) {
    width: 50%; 
    padding: 45px;
  }
`;

export const TitleForm = styled.h2`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 25px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`

export const SearchButton = styled.button`
  background-color: #DE1212;
  background-image: url(${icoSearch});
  background-repeat: no-repeat;
  background-position: left 35% center;
  font-weight: 900;
  font-size: 16px;
  border-radius: 5px;
  color: #fff;
  width: 100%;
  padding: 10px 0;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #9d0000;
    box-shadow: inset 1px 0 0 rgba(255,255,255,0.2),inset -1px 0 0 rgba(255,255,255,0.2),inset 0 -1px 0 rgba(255,255,255,0.2),inset 0 1px 0 rgba(255,255,255,0.2)
  }

  &:active {  
    background-color: #f90000;
    box-shadow: inset 1px 0 0 rgba(255,255,255,0.2),inset -1px 0 0 rgba(255,255,255,0.2),inset 0 -1px 0 rgba(255,255,255,0.2),inset 0 1px 0 rgba(255,255,255,0.2)
  }
`


export const InputSearch = styled.input`
  border-radius: 5px;
  text-align: left;
  padding-left: 25px;
  font-size: 14px;
  border: none;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

export const SuggestionContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SuggestionContentWrapper = styled.div`
  position: absolute;
  z-index: 2;
  left: 10px;
  top: 10px;

  span:first-child {
    visibility: hidden;
  }
`;

interface SuggestionContentProps {
  children: React.ReactNode;
}

export const SuggestionContent = ({ children, ...props }:SuggestionContentProps) => {
  return (
    <SuggestionContentWrapper {...props}>
      {children}
    </SuggestionContentWrapper>
  );
};

export const TabSuggestion = styled.span`
  width: 31px;
  position: absolute;
  right: -3px;
  top: 2px;
  height: 16px;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  font-weight: 400;
  font-size: 9px;
  color: #000;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0 0 0;
  gap: 20px;
  width: 100%;
  justify-content: end;
`;

export const FiltersTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  align-items: center;
  gap: 10px;
  font-size: 14px;

  img {
    max-width: 15px;
    max-height: 15px;
  }
`;

export const FiltersWrapper= styled.div`
  display: flex;
  flex-direction: row;
`;

