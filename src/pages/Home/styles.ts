import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Main = styled.main`
  width: 100%;
  display: block;
`;

export const Content = styled.section`
  position: fixed;
  top: 3.8rem;
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
