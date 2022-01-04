import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  button.ant-btn {
    border: 0;

    background-color: ${props => (props.color ? props.color : '#fff')};
    color: ${props => (props.color ? '#fff' : '#37343c')};

    border-radius: 4px;
  }

  button.ant-btn:hover,
  .ant-btn:focus,
  .ant-btn:active {
    border: 0;
    background: ${props =>
      props.color ? shade(0.1, props.color) : shade(0.1, '#fff')};
  }
`;
