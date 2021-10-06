import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;


  @media(max-width: 930px) {
    flex-direction: column;
    form {
      flex-shrink: 1;
    }
  }
`;
