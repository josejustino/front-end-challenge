import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  margin-top: 2rem;
`;

export const Card = styled.div`
  width: 10rem;
  height: 15rem;

  & > div {
    img {
      width: 10rem;
      height: 15rem;

      border-radius: 10px;
    }
  }
`;
