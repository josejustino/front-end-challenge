import styled, { css } from 'styled-components';

interface ContentProps {
  image: string;
}

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
  overflow-y: auto;
  right: 0;
  bottom: 0;
`;

export const ContentBackground = styled.div<ContentProps>`
  ${props =>
    props.image &&
    css`
      background-image: url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.image}');
      background-size: cover;
      background-position: right -20rem top;
    `}
`;

export const ContainerSections = styled.div`
  padding: 1.25rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: row;

  background-image: linear-gradient(
    to right,
    rgba(10%, 10%, 10%, 1) 150px,
    rgba(22%, 22%, 23%, 0.77) 100%
  );
`;

export const ImageSection = styled.section`
  padding: 1.75rem;

  & > img {
    width: 20rem;
    height: 30rem;
    border-radius: 10px;
  }
`;

export const ContentSection = styled.section`
  padding: 1.25rem;
  margin-top: 1.75rem;

  & > p.quick-info {
    display: flex;
    flex-direction: row;

    margin-top: 1rem;
  }

  & > div.user-score {
    margin-top: 1rem;
  }

  p {
    margin-top: 1rem;
  }

  & > div.authors {
    display: flex;
    flex-direction: row;
  }
`;
