import { LinkWrapper } from '../../style/CommonStyles.tsx';
import { Link } from 'react-router-dom';
import IcoArrow from '../../assets/ico-select.png';
import styled from 'styled-components';

const BackButtonImage = styled.img`
  transform: rotate(90deg);
  position: relative;
  top: -3px;
  left: -10px;
`;

const BackButton = () => {
  return (
    <LinkWrapper>
      <BackButtonImage src={IcoArrow} alt="Back" />
      <Link to={'/'} style={{fontWeight: 900}}>Back</Link>
    </LinkWrapper>
  )
};

export default BackButton;
