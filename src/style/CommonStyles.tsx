import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const ContainerWithText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-weight: 900;
  font-size: 18px;
  flex-direction: column;

  div {
    text-align: center;
  }
`;

export const Card = styled.div`
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

export const LinkWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
  text-align: right;

  @media (min-width: 768px) {
    max-width: 800px;
    text-align: right !important;
    padding: 40px;
  }

  a {
    text-decoration: none;
    font-size: 14px;
    color: #fff;
  }
`