import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 11.3rem);
  gap: 1rem;
`;

export const Card = styled.div`
  width: 11.3rem;

  & > div.card-image {
    height: 16.95rem;

    img {
      width: 11.3rem;
      height: 17rem;

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  & > div.card-footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    background: var(--blue-dark);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    padding: 0.75rem;

    span + span {
      margin-top: 0.25rem;
    }
  }
`;
