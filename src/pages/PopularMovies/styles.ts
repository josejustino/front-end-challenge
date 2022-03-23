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
  top: 4.7rem;
  right: 0;
  bottom: 0.125rem;
  overflow-y: auto;
  margin: 0 auto;
  width: 100%;

  & > div.loading__more {
    height: 0.125rem;
  }
`;

export const Section = styled.section`
  margin: 2rem auto 0;
  width: min(90vw, 1080px);
`;

export const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 12.3rem);
  gap: 1.5rem;

  margin-top: 1.5rem;

  & > h1 {
    margin-left: 0.25rem;
  }
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0 2rem;
  position: relative;
  width: 100%;
  height: 5rem;
  justify-content: center;

  & > span {
    color: var(--blue-dark);
  }
`;

export const FilterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FilterFormContent = styled.div`
  display: flex;
  width: 100%;
`;

export const ButtonsFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 16px;
`;
