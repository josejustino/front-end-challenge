import styled, { css } from 'styled-components';

interface ContainerProps {
  image: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;

  ${props =>
    props.image &&
    css`
      flex: 1;
      background-image: url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${props.image}');
      background-size: cover;
    `}
`;

export const Main = styled.main``;

export const Section = styled.section``;

export const Content = styled.div``;
