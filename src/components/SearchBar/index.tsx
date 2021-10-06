import React, { FormEvent, useState } from 'react';
import { useProductList } from '../../hooks/useProductList';

import { api } from '../../services/api';

import { Form, Error } from './styles';


const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState('');
  const {setProducts} = useProductList()

  async function handleSubmit(event?: FormEvent ): Promise<void> {
    event?.preventDefault();

    if(!searchTerm) {
        setInputError('Digite o nome do Game antes de pesquisar');
        return;
    }
    try {
        const response = await api.get(`products?q=${searchTerm}`);

        const products = response.data

        setProducts(products)
        setSearchTerm('');
        setInputError('');

    } catch (error) {
        setInputError('Erro na busca por esse Game')
    }
  }

  return (
    <>
      <Form hasError={!!inputError} onSubmit={handleSubmit}>
          <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do Game"
          />
          <button type="submit">Pesquisar</button>
      </Form>
      { inputError &&  <Error>{inputError}</Error> }
    </>

  );
};

export default SearchBar;
