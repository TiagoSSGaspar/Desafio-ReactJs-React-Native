import React, { SelectHTMLAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {Container} from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: {
      key: string,
      direction: string
    };
    label: string;
  }>;
}


const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <Container className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        {options.map(option => {
          return <option key={uuidv4()} value={JSON.stringify(option.value)}>{option.label}</option>
        })}
      </select>
    </Container>
  );
}

export default Select;
