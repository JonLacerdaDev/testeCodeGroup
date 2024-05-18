import logoHeader from '../../assets/logo-header.png';
import { HeaderContainer, Logo } from './HeaderStyle'

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logoHeader} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
