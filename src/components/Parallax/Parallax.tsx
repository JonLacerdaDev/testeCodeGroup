import { useRef, useEffect } from 'react';
import './Parallax.css'; 
import { ParallaxContainer, ParallaxLayer } from './ParallaxStyle'; 

import imageParallaxBgMobile from '../../assets/bg-mobile.png';
import imageParallax01 from '../../assets/imageParallax01.png';
import imageParallax02 from '../../assets/imageParallax02.png';
import imageParallax03 from '../../assets/imageParallax03.png';
import imageParallax04 from '../../assets/imageParallax04.png';
import imageParallax05 from '../../assets/imageParallax05.png';
import imageParallax06 from '../../assets/imageParallax06.png';
import imageParallax07 from '../../assets/imageParallax07.png';
import imageParallax08 from '../../assets/imageParallax08.png';
import imageParallax09 from '../../assets/imageParallax09.png';
import imageParallax10 from '../../assets/imageParallax10.png';
import imageParallax11 from '../../assets/imageParallax11.png';
import imageParallax12 from '../../assets/imageParallax12.png';
import imageParallax13 from '../../assets/imageParallax13.png';

const Parallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOrientation = (x: number, y: number) => {
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        const depth = layer.getAttribute('data-depth');
        if (!depth) return;

        const movementX = -(x * parseFloat(depth)) / 10;
        const movementY = -(y * parseFloat(depth)) / 10;
  
        (layer as HTMLElement).style.transform = `translate(${movementX}px, ${movementY}px)`;
      });
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      handleOrientation(e.gamma || 0, e.beta || 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      handleOrientation(x * 45, y * 45);
    };

    window.addEventListener('deviceorientation', handleDeviceOrientation);
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ParallaxContainer ref={containerRef}>
      <ParallaxLayer src={imageParallaxBgMobile} alt="Star Wars Background" />
      <ParallaxLayer src={imageParallax01} alt="Star Wars Background" />
      <ParallaxLayer src={imageParallax02} alt="Star Wars Background" className="parallax-layer" data-depth="0.1" />
      <ParallaxLayer src={imageParallax03} alt="Star Wars Background" className="parallax-layer" data-depth="0.2" />
      <ParallaxLayer src={imageParallax04} alt="Star Wars Background" className="parallax-layer" data-depth="0.3" />
      <ParallaxLayer src={imageParallax05} alt="Star Wars Background" className="parallax-layer" data-depth="0.4" />
      <ParallaxLayer src={imageParallax06} alt="Star Wars Background" className="parallax-layer" data-depth="0.5" />
      <ParallaxLayer src={imageParallax07} alt="Star Wars Background" className="parallax-layer" data-depth="0.6" />
      <ParallaxLayer src={imageParallax08} alt="Star Wars Background" className="parallax-layer" data-depth="0.7" />
      <ParallaxLayer src={imageParallax09} alt="Star Wars Background" className="parallax-layer" data-depth="0.8" />
      <ParallaxLayer src={imageParallax10} alt="Star Wars Background" className="parallax-layer" data-depth="0.9" />
      <ParallaxLayer src={imageParallax11} alt="Star Wars Background" className="parallax-layer" data-depth="1.0" />
      <ParallaxLayer src={imageParallax12} alt="Star Wars Background" className="parallax-layer" data-depth="1.1" />
      <ParallaxLayer src={imageParallax13} alt="Star Wars Background" className="parallax-layer" data-depth="1.2" />
    </ParallaxContainer>
  );
};

export default Parallax;
