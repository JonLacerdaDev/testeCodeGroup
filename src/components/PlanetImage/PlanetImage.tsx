import React from 'react';
import planetNotFoundImage from '../../assets/planet-image-not-found.png';

type PlanetName =
  | 'tatooine'
  | 'naboo'
  | 'mustafar'
  | 'kashyyyk'
  | 'hoth'
  | 'endor'
  | 'dagobah'
  | 'coruscant'
  | 'bespin'
  | 'alderaan';

interface PlanetImageProps {
  planetName: PlanetName;
  className?: string;
}

const planetImages: Record<PlanetName, string> = {
  tatooine: 'https://cryptospro.com.br/planetas/planeta_0000_tatooine.png',
  naboo: 'https://cryptospro.com.br/planetas/planeta_0001_naboo.png',
  mustafar: 'https://cryptospro.com.br/planetas/planeta_0002_mustafar.png',
  kashyyyk: 'https://cryptospro.com.br/planetas/planeta_0003_kashyyyk.png',
  hoth: 'https://cryptospro.com.br/planetas/planeta_0004_hoth.png',
  endor: 'https://cryptospro.com.br/planetas/planeta_0005_endor.png',
  dagobah: 'https://cryptospro.com.br/planetas/planeta_0006_dagobah.png',
  coruscant: 'https://cryptospro.com.br/planetas/planeta_0007_coruscant.png',
  bespin: 'https://cryptospro.com.br/planetas/planeta_0008_bespin.png',
  alderaan: 'https://cryptospro.com.br/planetas/planeta_0009_alderaan.png',
};

const PlanetImage: React.FC<PlanetImageProps> = ({ planetName, className }) => {
  const key = planetName.toLowerCase() as PlanetName;
  const planetImage = planetImages[key] || planetNotFoundImage;
  return <img src={planetImage} alt={planetName} className={className} />;
};

export const hasValidImage = (planetName: string) => {
  const key = planetName.toLowerCase() as PlanetName;
  return !!planetImages[key];
};

export default PlanetImage;
