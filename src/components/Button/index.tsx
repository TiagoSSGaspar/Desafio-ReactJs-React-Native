import React, { ButtonHTMLAttributes, FC } from 'react';

import {Container} from './styles';

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({children, ...rest}) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Button;
