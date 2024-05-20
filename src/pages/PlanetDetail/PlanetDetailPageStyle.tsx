import styled from 'styled-components';

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

  img {
    margin-right: 10px;
  }

  p {
    margin: 0;
    text-transform: capitalize;
  }

  @media (min-width: 768px) {
    gap: 5px;
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
  padding: 25px 0 15px 25px;
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

export const InputEdit = styled.input`
  border-radius: 5px;
  text-align: left;
  padding-left: 25px;
  font-size: 14px;
  border: 1px solid #000;
  position: relative;
  z-index: 1;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;