
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  gap: 45px;
`;

export const Text = styled.p`
  margin: 0;
  display: none;
  position: relative;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const Logo = styled.img`
  width: 100px; 
`;

export const Divider = styled.div`
  width: 1px;
  height: 44px;
  background-color: #000;
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`