import React from 'react';

import SearchBar from '../../components/SearchBar';
import Catalog from '../../components/Catalog';
import { Container } from './styles';


const Home = (): JSX.Element => {

  return (
    <Container>
      <SearchBar/>
      <Catalog/>
    </Container>
  );
};

export default Home;
