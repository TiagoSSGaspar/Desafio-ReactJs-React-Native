import React, { FormEvent, forwardRef, useImperativeHandle, useState } from 'react';

import { api } from '../../services/api';
import { Product } from '../../types';
import { formatPrice } from '../../util/format';

import { Form, Error } from './styles';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface FormProps {
  data?: string;
}

export interface FormRef {
  handleSubmit(): Promise<void>;
  products: Product[];
}

const SearchBar: React.ForwardRefRenderFunction<FormRef, FormProps> = (props, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputError, setInputError] = useState('');
  const [products, setProducts] = useState<ProductFormatted[]>([]);

  async function handleSubmit(event?: FormEvent ): Promise<void> {
    event?.preventDefault();

    if(!searchTerm) {
        setInputError('Digite o nome do Game antes de pesquisar');
        return;
    }
    try {
        const response = await api.get(`products?q=${searchTerm}`);

        const productsFormated = response.data.map(function(product: Product){
          return {...product, price: formatPrice(product.price)}
        })
        setProducts(productsFormated)
        setSearchTerm('');
        setInputError('');

    } catch (error) {
        setInputError('Erro na busca por esse Game')
    }
    console.log(products);
  }

  useImperativeHandle(ref, () => ({
    handleSubmit,
    products,
  }))

  return (
    <>
      <Form hasError={!!inputError} onSubmit={handleSubmit}>
          <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome do repositório"
          />
          <button type="submit">Pesquisar</button>
      </Form>
      { inputError &&  <Error>{inputError}</Error> }
    </>

  );
};

export default forwardRef(SearchBar);
