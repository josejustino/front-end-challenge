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
  top: 4.4rem;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  margin: 0 auto;
  width: 100%;

  & > div {
    height: 1rem;
  }
`;

export const Section = styled.section`
  margin: 2rem auto;
  width: min(90vw, 1080px);
`;
