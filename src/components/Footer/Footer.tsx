import React from 'react';
import logoFooter from '../../assets/logo-footer.png';

import { FooterContainer, Text, Logo } from './FooterStyle'

const Footer = () => {
  return (
    <FooterContainer>
      <Text>STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2023 | Todos os direitos reservados</Text>
      <Logo src={logoFooter} alt="Logo Footer" />
    </FooterContainer>
  );
};

export default Footer;
