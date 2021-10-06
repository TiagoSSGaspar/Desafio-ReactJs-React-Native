import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  label {
    color: #fff;
    font-size: 1.4rem;
    margin-right: 1rem;
  }

 select {
    height: 4.5rem;
    border-radius: 0.8rem;
    background: #04D361;
    border: 1px solid #04D361;
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Archivo;

  }
  @media(max-width: 930px) {
    label {
      font-size: .75rem;
    }
  }

`;
