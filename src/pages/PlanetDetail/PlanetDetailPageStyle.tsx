import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const ContainerNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  font-weight: 900;
  font-size: 18px;

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

export const PlanetName = styled.h2`
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
  text-transform: uppercase;
`;

export const Section = styled.div`
  margin-top: 20px;
`;

export const SectionWithColor = styled.div`
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

export const SectionTitle = styled.p`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconText = styled.div`
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

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ListItem = styled.li`
`;

export const HeaderItem = styled.div`
  display: flex;
  padding: 25px 0 0 25px;
`;

export const ListInfos = styled.div`
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

export const PlanetTitle = styled.p`
`;

export const PlanetWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;