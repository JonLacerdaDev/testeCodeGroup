import { useState, useEffect } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import './LightsaberLoader.css';
import imageBGDektop from '../../assets/imageParallax01.png';
import imageBGMobile from '../../assets/bg-mobile.png';

const LightsaberLoader = () => {
  const { loading, progress } = useLoading();
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShouldHide(true);
      }, 3000); 
    }
  }, [progress]);

  return (
    <div id="loading-page" className={`${shouldHide ? 'fade-out' : ''}`}>
      <div id="container" style={{ display: loading ? 'flex' : 'none' }}>
        <div className='background'>
          <img src={imageBGDektop} alt="Background Star Wars" className='desktop-only'/>
          <img src={imageBGMobile} alt="Background Star Wars" className='mobile-only'/>          
        </div>
        <div className='lightsaber-wrapper'>
          <div id="lightsaber">
            <div className="progress">
              <div className="glow-shit" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="handle">
              <div className="buttplug"></div>
              <div className="butt"></div>
              <div className="above-butt"></div>
              <div className="coily-shit"></div>
              <div className="gold-fuck"></div>
              <div className="other-gold-fuck"></div>
              <div className="fin"></div>
            </div>
          </div>
          <p id="loading">
            Loading <span>{progress}</span>%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LightsaberLoader;
