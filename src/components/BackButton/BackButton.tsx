import { Link } from 'react-router-dom';
import IcoArrow from '../../assets/ico-select.png';

import { BackButtonImage } from './BackButtonStyle'
import { LinkWrapper } from '../../style/CommonStyles';

const BackButton = () => {
  return (
    <LinkWrapper>
      <BackButtonImage src={IcoArrow} alt="Back" />
      <Link to={'/'} style={{fontWeight: 900}}>Back</Link>
    </LinkWrapper>
  )
};

export default BackButton;
