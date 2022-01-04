import React, { ButtonHTMLAttributes } from 'react';
import { Button as AntButton } from 'antd';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  marginLess?: boolean;
  content: string;
  size?: 'small' | 'middle' | 'large';
  containerStyle?: object;
  key?: string | number;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  type = 'button',
  marginLess = false,
  content,
  containerStyle,
  ...props
}) => {
  const { color } = props;

  const style = {
    ...containerStyle,
    color,
    marginLeft: marginLess ? 0 : '8px',
    marginRight: marginLess ? 0 : '8px',
  };

  return (
    <Container style={style} color={color}>
      <AntButton loading={loading} htmlType={type} {...props}>
        {content}
      </AntButton>
    </Container>
  );
};
