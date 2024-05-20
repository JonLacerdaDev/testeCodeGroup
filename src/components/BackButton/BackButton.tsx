import { LinkWrapper } from '../../style/CommonStyles.tsx';
import { Link } from 'react-router-dom';
import IcoArrow from '../../assets/ico-select.png';
import styled from 'styled-components';

const BackButtonImage = styled.img`
  
`;

const BackButton = () => {
  return (
    <LinkWrapper>
      <BackButtonImage src={IcoArrow} alt="Back" />
      <Link to={'/'}> &lt; Back</Link>
    </LinkWrapper>
  )
};

export default BackButton;
