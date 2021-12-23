import styled from 'styled-components';

export const LoadingContainer = styled.div`
  position: fixed;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;

  width: 100%;
  height: 100%;

  background-color: #000000;
  opacity: 0.7;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
