
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 18px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); 
  margin: 0;
`;

export const Text = styled.p`
  margin: 0;
  display: none;
  position: relative;

  &::after {
    content: '';
    width: 1px;
    height: 44px;
    background-color: #000;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const Logo = styled.img`
  width: 100px; 
`;