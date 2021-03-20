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

  width: 100%;
`;

export const ContentBackground = styled.div<ContentProps>`
  height: 100%;

  ${props =>
    props.image &&
    css`
      background-image: url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.image}');
      background-size: cover;
      background-position: right -20rem top;
    `}
`;

export const ContainerInfo = styled.div`
  display: flex;
  justify-content: center;

  height: 100%;

  background-image: linear-gradient(
    to right,
    rgba(10%, 10%, 10%, 1) 150px,
    rgba(22%, 22%, 23%, 0.77) 100%
  );
`;

export const ContainerSections = styled.div`
  padding: 1.25rem;
  margin-top: 1rem;

  max-width: 1440px;
  width: 100%;

  display: flex;
  flex-direction: row;
`;

export const ImageSection = styled.section`
  padding: 1.75rem;

  & > img {
    border-radius: 10px;
  }
`;

export const ContentSection = styled.section`
  padding: 1.25rem;
  margin-top: 1.75rem;

  h2 {
    font-size: 2rem;
  }

  & > p.quick-info {
    display: flex;
    flex-direction: row;

    margin-top: 0.25rem;

    span.genres,
    span.duration {
      position: relative;
      margin-left: 1rem;

      display: inline-flex;
      align-content: center;
      align-items: center;
    }

    span.genres::before,
    span.duration::before {
      content: '';

      background-color: var(--white);

      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      left: -0.5rem;

      position: absolute;
    }
  }

  & > div.user-score {
    margin-top: 1rem;
  }

  h3 {
    margin-top: 0.75rem;
  }

  p.abstract {
    margin-top: 0.75rem;
  }

  & > div.authors {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    margin-top: 1.5rem;

    ol {
      list-style: none;

      width: 33%;

      li + li {
        margin-top: 1.5rem;
      }

      li {
        width: 100%;
        padding-right: 1.5rem;

        p:last-child {
          font-size: 0.75rem;
        }
      }
    }
  }
`;
