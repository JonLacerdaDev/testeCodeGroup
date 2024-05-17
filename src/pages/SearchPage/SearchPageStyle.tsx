import styled from 'styled-components';

export const PlanetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 25px;

  a {
    flex: 0 0 calc(30% - 20px);
    margin: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background-color: #909090;
    }

    @media (max-width: 768px) {
      flex: 0 0 calc(100% - 20px);
    }
  }
`;

export const Item = styled.div`
  img {
    max-width: 150px;
  }

  span {
    font-size: 14px;
    font-weight: 300;
    color: #000;
    display: block;
    margin-top: 15px;
  }

  p {
    display: block;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #000;
  }
`;

export const SearchTerm = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #000;
  text-align: center;
  background: #fff;
  margin-bottom: 15px;
  display: block;
  padding: 15px;

  span {
    color: #de1212;
  }
`;
