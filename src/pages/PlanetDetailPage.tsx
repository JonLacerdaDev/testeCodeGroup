import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanets } from '../contexts/PlanetsContext';
import { useFilms } from '../contexts/FilmesContext';
import { usePeople } from '../contexts/PeopleContext'; 
import PlanetImage from '../components/PlanetImage/PlanetImage';
import styled from 'styled-components';
import icoTemp from '../assets/ico-temp.png';
import icoTerrain from '../assets/ico-terrain.png';
import icoPopulation from '../assets/ico-population.png';
import icoPeople from '../assets/ico-people.png';
import icoFilms from '../assets/ico-films.png';
import '../style/PlanetDetail.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  margin: 40px 20px 20px;

  @media (min-width: 768px) {
    max-width: 800px;
    text-align: left;
    padding: 40px;
  }
`;

const PlanetName = styled.h2`
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  text-transform: Uppercase;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionWithColor = styled.div`
  margin-top: 20px;
  background-color: #F1F1F1;
  padding: 20px;
  border-radius: 8px;
  position: relative;

  > div {
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #909090;
      position: absolute;
      bottom: -15px;
    }
  }
`;

const SectionTitle = styled.p`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  img {
    width: 20px;
    height: 20px;
  }

  p {
    margin: 0;
    text-transform: capitalize;
  }

  @media (min-width: 768px) {
    gap: 12px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ListItem = styled.li`
`;

const HeaderItem = styled.div`
  display: flex;
  padding: 25px 0 0 25px;

 
`;

const ListInfos = styled.div`
  text-align: left;
  padding-left: 20px;

  @media (min-width: 768px) {
    display: flex;
    gap: 80px;


    > div:last-child {
      margin-top: -40px;
    }
  }
`;


const PlanetTitle = styled.p`

`;

const PlanetWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const PlanetDetailPage = () => {
  const { urlPlanetName } = useParams<{ urlPlanetName: string }>();
  const { planets } = usePlanets();
  const films = useFilms();
  const { people } = usePeople();
  const [planet, setPlanet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPlanetName, setNewPlanetName] = useState<string>('');

  useEffect(() => {
    const matchedPlanet = planets.find((planet: any) => {
      return planet.name.toLowerCase().includes(urlPlanetName?.toLowerCase());
    });

    if (matchedPlanet) {
      setPlanet(matchedPlanet);
    }
  }, [urlPlanetName, planets]);

  const handleNameChange = () => {
    if (newPlanetName.trim() !== '') {
      setPlanet({ ...planet, name: newPlanetName });
      setIsEditing(false);
    }
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  

  return (
    <Container>
      <Card>
        <HeaderItem>
          <PlanetImage planetName={'tatooine'} className="image-detail" />
          <ListInfos>    
            <PlanetWrapper>
              <PlanetTitle>
                Planet:
              </PlanetTitle>
              <PlanetName onClick={handleTitleClick}>
                {isEditing ? (
                  <input
                    type="text"
                    value={newPlanetName}
                    onChange={(e) => setNewPlanetName(e.target.value)}
                    onBlur={handleNameChange}
                    autoFocus
                  />
                ) : (
                  'tatooine'
                )}
              </PlanetName>
            </PlanetWrapper>
            <PlanetWrapper>
              <Section>
                <IconText>
                  <img src={icoTemp} alt="Climate Icon" />
                  <SectionTitle>Climate:</SectionTitle>
                  <p>{'tatooine'}</p>
                </IconText>
              </Section>
              <Section>
                <IconText>
                  <img src={icoTerrain} alt="Terrain Icon" />
                  <SectionTitle>Terrain:</SectionTitle>
                  <p>{'tatooine'}</p>
                </IconText>
              </Section>
              <Section>
                <IconText>
                  <img src={icoPopulation} alt="Population Icon" />
                  <SectionTitle>Population:</SectionTitle>
                  <p>{'tatooine'}</p>
                </IconText>
              </Section>
            </PlanetWrapper>
          </ListInfos>
        </HeaderItem>
        
        {planet?.residents.length > 0 && (
          <SectionWithColor>
            <IconText>
              <img src={icoPeople} alt="Residents Icon" />
              <SectionTitle>Residents:</SectionTitle>
            </IconText>
            <List>
              {planet?.residents.map((resident: string, index: number) => (
                <ListItem key={index}>{people.find((p: any) => p.url === resident)?.name || 'Unknown'},</ListItem>
              ))}
            </List>
          </SectionWithColor>
        )}
  
        <SectionWithColor>
          <IconText>
            <img src={icoFilms} alt="Films Icon" />
            <SectionTitle>Films: {'(5)'}</SectionTitle>
          </IconText>
          <List>
            {planet?.films.map((film: string, index: number) => (
              <ListItem key={index}>{films.find((f: any) => f.url === film)?.title || 'Unknown'},</ListItem>
            ))}
          </List>
        </SectionWithColor>
      </Card>
    </Container>
  );
};

export default PlanetDetailPage;
