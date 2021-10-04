import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface FormProps {
  hasError: boolean
}

export const Form = styled.form<FormProps>`
  max-width: 500px;
  margin-bottom: 2rem;

  display: flex;

  input {
      flex: 1;
      padding: 0 24px;
      border: 0;
      border-radius: 5px 0 0 5px;
      color: #3a3a3a;
      border: 2px solid #fff;
      border-right: 0;

      ${ (props) => props.hasError && css`
          border-color: #C53030;
      ` }

      &::placeholder {
          color: #a8a8b3;
      }
  }

  button {
      height: 70px;
      width: 210px;
      border-radius: 0 5px 5px 0;
      border: 0;
      color: #fff;
      background: #04D361;
      transition: background-color 0.2s;

      &:hover {
          background: ${shade(0.2, '#04D361')};
      }
  }
`;

export const Error = styled.span`
  display: block;
  color: #C53030;
  margin-top: 8px;
`;

