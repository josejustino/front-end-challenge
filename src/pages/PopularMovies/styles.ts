import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Main = styled.main`
  width: 100%;
  display: block;
`;

export const Content = styled.div`
  position: fixed;
  top: 5rem;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  margin: 0 auto;
  width: 100%;
`;

export const Section = styled.section`
  width: min(90vw, 1200px);
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;
