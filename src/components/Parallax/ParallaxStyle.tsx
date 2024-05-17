import styled from 'styled-components';

export const ParallaxContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: calc( 100vh - 75px);;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const ParallaxLayer = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;
