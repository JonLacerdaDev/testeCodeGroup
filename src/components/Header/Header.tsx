import logoHeader from '../../assets/logo-header.png';
import { HeaderContainer, Logo } from './HeaderStyle';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <Link to={'/'}>
        <Logo src={logoHeader} alt="Logo" />
      </Link>
    </HeaderContainer>
  );
};

export default Header;
