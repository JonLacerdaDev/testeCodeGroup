import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanets } from '../../contexts/PlanetsContext';
import { useFilms } from '../../contexts/FilmesContext';
import { usePeople } from '../../contexts/PeopleContext'; 
import PlanetImage from '../../components/PlanetImage/PlanetImage';
import icoTemp from '../../assets/ico-temp.png';
import icoTerrain from '../../assets/ico-terrain.png';
import icoPopulation from '../../assets/ico-population.png';
import icoPeople from '../../assets/ico-people.png';
import icoFilms from '../../assets/ico-films.png';
import '../../style/PlanetDetail.css';

import { Link } from 'react-router-dom';

import { 
  Card, 
  Container, 
  HeaderItem, 
  IconText, 
  List, 
  ListInfos, 
  ListItem, 
  PlanetName, 
  PlanetTitle, 
  PlanetWrapper, 
  Section, 
  SectionTitle, 
  SectionWithColor, 
  ContainerNotFound } from './PlanetDetailPageStyle';

type Resident = {
  url: string;
  name: string;
};

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  residents: Resident[];
  films: string[];
}

const PlanetDetailPage = () => {
  const { urlPlanetName = '' } = useParams<{ urlPlanetName?: string }>();
  const { planets } = usePlanets();
  const films = useFilms();
  const { people } = usePeople();
  const [planet, setPlanet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPlanetName, setNewPlanetName] = useState<string>('');

  useEffect(() => {
    const matchedPlanet = planets.find((planet) => {
      return planet.name.toLowerCase().includes(urlPlanetName?.toLowerCase());
    });

    if (matchedPlanet) {
      setPlanet(matchedPlanet);
    }
  }, [urlPlanetName, planets]);

  // const handleNameChange = () => {
  //   if (newPlanetName.trim() !== '' && planet) {
  //     setPlanet((prevPlanet) => ({
  //       ...prevPlanet!,
  //       name: newPlanetName
  //     }));
  //     setIsEditing(false);
  //   }
  // };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  return planet ? (
    <>
      <Container>
        <Card>
          <HeaderItem>
            <PlanetImage planetName={planet.name} className="image-detail" />
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
                      // onBlur={handleNameChange}
                      autoFocus
                    />
                  ) : (
                    planet.name
                  )}
                </PlanetName>
              </PlanetWrapper>
              <PlanetWrapper>
                <Section>
                  <IconText>
                    <img src={icoTemp} alt="Climate Icon" />
                    <SectionTitle>Climate:</SectionTitle>
                    <p>{planet.climate}</p>
                  </IconText>
                </Section>
                <Section>
                  <IconText>
                    <img src={icoTerrain} alt="Terrain Icon" />
                    <SectionTitle>Terrain:</SectionTitle>
                    <p>{planet.terrain}</p>
                  </IconText>
                </Section>
                <Section>
                  <IconText>
                    <img src={icoPopulation} alt="Population Icon" />
                    <SectionTitle>Population:</SectionTitle>
                    <p>{Number(planet.population).toLocaleString()}</p>
                  </IconText>
                </Section>
              </PlanetWrapper>
            </ListInfos>
          </HeaderItem>
          
          {planet.residents.length > 0 && (
            <SectionWithColor>
              <IconText>
                <img src={icoPeople} alt="Residents Icon" />
                <SectionTitle>Residents:</SectionTitle>
              </IconText>
              <List>
                {planet.residents.map((resident: Resident, index: number) => (
                  <ListItem key={index}>
                    {people.find((p) => p.url === resident)?.name || 'Unknown'}
                    {index < planet.residents.length - 1 && ','}
                  </ListItem>
                ))}
              </List>
            </SectionWithColor>
          )}
    
          <SectionWithColor>
            <IconText>
              <img src={icoFilms} alt="Films Icon" />
              <SectionTitle>Films: {`(${planet.films.length})`}</SectionTitle>
            </IconText>
            <List>
              {planet.films.map((film: string, index: number) => (
                <ListItem key={index}>
                  {films.find((f) => f.url === film)?.title || 'Unknown'}
                  {index < planet.films.length  && ','}
                </ListItem>
              ))}
            </List>
          </SectionWithColor>
        </Card>
      </Container>
      <Link to={'/'}>Voltar</Link>
    </>
  ) : (
    <ContainerNotFound>
      <Card>
      🪐 Planeta não encontrado 🪐
      </Card>
    </ContainerNotFound>
  );
};

export default PlanetDetailPage;
