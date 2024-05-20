import { Card, ContainerWithText } from '../../style/CommonStyles';
import BackButton from '../../components/BackButton/BackButton'

const NotFound = () => {
  return (
    <ContainerWithText>
      <Card>
      😔 404 - Page Not found 😔 
      </Card>
      <BackButton />
    </ContainerWithText>
  )
};

export default NotFound;
