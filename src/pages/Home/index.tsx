import { useRef } from 'react';

import SearchBar, { FormRef } from '../../components/SearchBar';
import Catalog from '../../components/Catalog';
import { Container } from './styles';


const Home = (): JSX.Element => {
  const formRef = useRef<FormRef>(null);

  return (
    <Container>
      <SearchBar ref={formRef}/>
      <Catalog/>
    </Container>
  );
};

export default Home;
