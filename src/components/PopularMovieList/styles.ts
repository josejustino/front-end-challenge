import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h1 {
    margin-left: 0.25rem;
  }
`;

export const CardsList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 12.3rem);
  gap: 1.5rem;

  margin-top: 1.5rem;
`;

export const Card = styled.div`
  width: 12.3rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 70%);
  border: 1px solid #4e4a4a;
  border-radius: 10px;
  background: #413d4a;

  & > div.card-image {
    height: 18rem;

    img {
      width: 12.2rem;
      height: 18rem;

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  & > div.card-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    color: var(--white);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    padding: 0.75rem;

    & > h3 > a {
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        color: var(--blue);
        transition: color 0.3s;
      }
    }

    & > p {
      margin-top: 0.5rem;
    }
  }
`;
