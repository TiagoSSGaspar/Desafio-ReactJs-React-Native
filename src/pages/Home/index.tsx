import React from 'react';

import SearchBar from '../../components/SearchBar';
import Catalog from '../../components/Catalog';
import { Header } from './styles';
import Filter from '../../components/Filter';


const Home = (): JSX.Element => {

  return (
    <>
      <Header>
        <SearchBar/>
        <Filter/>
      </Header>
      <Catalog/>
    </>
  );
};

export default Home;
