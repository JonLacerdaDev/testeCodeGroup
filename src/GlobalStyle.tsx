import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;900&display=swap');
  
  * {
    font-family: Lato, sans-serif;
    margin: 0;
    padding: 0;
  }

  *, 
  *:before, 
  *:after{
    box-sizing: border-box;
  }

  .spaceship {
    left: auto;
    bottom: -80px;
    right: -100px;

    @media only screen and (min-width: 768px) {
      left: -70px;
      bottom: -155px;
      right: auto;
    }
  }

  .mobile-only {
    display: none !important; 
  }

  @media only screen and (max-width: 767px) {
    .mobile-only {
      display: block !important; 
    }
  }

  .desktop-only {
    display: none !important; 
  }
  
  @media only screen and (min-width: 768px) {
    .desktop-only {
      display: block !important; 
    }
  }
`;

export default GlobalStyle;
