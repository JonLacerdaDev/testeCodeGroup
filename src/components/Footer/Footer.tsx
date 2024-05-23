import logoFooter from '../../assets/logo-footer.png';
import { 
  FooterContainer, 
  Text, 
  Logo, 
  Divider } from './FooterStyle'

const Footer = () => {
  return (
    <FooterContainer>
      <Text>STARUARS LTDA | CNPJ: 77.777.777/0007-07 | 2024 | Todos os direitos reservados</Text>
      <Divider />
      <Logo src={logoFooter} alt="Logo Footer" />
    </FooterContainer>
  );
};

export default Footer;
