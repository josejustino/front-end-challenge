import styled from 'styled-components';

export const ContainerOverlay = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.7);

  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 1;
  visibility: visible;

  z-index: 999;
`;

export const ContainerModal = styled.div`
  background: var(--background);
  padding: 1.4rem;
  width: 90%;
  max-width: 500px;
  border-radius: 5px;

  position: relative;
  z-index: 1;
`;

export const ButtonsGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    border: 0;
    padding: 0;
    outline: 0;
    border-radius: 0.25rem;

    height: 40px;
    width: 48%;
    color: var(--white);
  }
`;

export const ButtonCancel = styled.button`
  background: var(--red);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonConfirm = styled.button`
  background: var(--blue-dark);
`;
