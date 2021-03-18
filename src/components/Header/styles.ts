import styled from 'styled-components';

export const Container = styled.header`
  flex: 1;
  display: flex;
  flex-direction: column;

  background: var(--header);

  padding: 1rem;
  position: fixed;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 2rem;
    }

    button {
      background: var(--white);
      color: var(--blue-dark);

      border: none;
      padding: 0.5rem;
      border-radius: 1rem;
    }
  }
`;
