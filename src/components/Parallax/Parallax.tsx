import { useRef, useEffect } from 'react';
import './Parallax.css'; 
import { ParallaxContainer, ParallaxLayer } from './ParallaxStyle'; 

import imageParallax01 from '../../assets/ImageParallax01.png';
import imageParallax03 from '../../assets/ImageParallax04.png';
import imageParallax04 from '../../assets/ImageParallax06.png';

import imageBGMobile from '../../assets/ImageBGmobile.png';

const Parallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOrientation = (x: number, y: number) => {
      const layers = document.querySelectorAll('.parallax-layer');
      layers.forEach((layer) => {
        const depth = layer.getAttribute('data-depth');
        if (!depth) return;

        const movementX = -(x * parseFloat(depth)) / 5;
        const movementY = -(y * parseFloat(depth)) / 5;
  
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
      <ParallaxLayer src={imageBGMobile} alt="Star Wars Background" className='mobile-only'/>
      <ParallaxLayer src={imageParallax01} alt="Star Wars Background" className='desktop-only'/>
      <ParallaxLayer src={imageParallax03} alt="Star Wars Background" className="parallax-layer" data-depth="0.2" />
      <ParallaxLayer src={imageParallax04} alt="Star Wars Background" className="parallax-layer" data-depth="0.3" />
    </ParallaxContainer>
  );
};

export default Parallax;
