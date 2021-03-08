import styled from 'styled-components';

export const Container = styled.header`
  flex: 1;
  display: flex;
  flex-direction: column;

  background: var(--header);

  padding: 20px;
  position: fixed;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
