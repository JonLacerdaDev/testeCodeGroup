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
    left: -70px;
    bottom: -155px;
  }
`;

export default GlobalStyle;
