import React, { useEffect, useState } from 'react';
import { useProductList } from '../../hooks/useProductList';

import Select from '../Select';

import { Container } from './styles';


interface IDataFilter {
  key: string,
  direction: string
}

const Filter: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<IDataFilter>({} as IDataFilter);
  const { products, setProducts } = useProductList()

  useEffect(() => {
    const data: any = [...products]
    const key = selectedFilter.key;
    const dir = selectedFilter.direction;

    const firstElement = (key) ? data[0][key] : data[0];
    const isNumber = !isNaN(firstElement);
    const isAsc = dir === 'asc';

    if (isNumber) {
      return setProducts(
        data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
          const x = (key) ? a[key] : a;
          const y = (key) ? b[key] : b;
          if (isAsc) return x - y;
          if (!isAsc) return y - x;
          return 0;
        })
      );
    }
    return setProducts(
      data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const x = JSON.stringify((key) ? a[key] : a);
        const y = JSON.stringify((key) ? b[key] : b);

        if (isAsc) return x.localeCompare(y);
        if (!isAsc) return y.localeCompare(x);
        return 0;
      })
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter])

  return (
    <Container>
      <Select
        name="typeFilter"
        label="Classificar por"
        value={JSON.stringify(selectedFilter)}
        onChange={(e) => setSelectedFilter(JSON.parse(e.target.value))}
        options={[
          { value: { key: '', direction: '' }, label: 'Selecione uma opção' },
          { value: { key: 'price', direction: 'asc' }, label: 'Preço: Crescente' },
          { value: { key: 'price', direction: 'desc' }, label: 'Preço: Decrescente' },
          { value: { key: 'score', direction: 'desc' }, label: 'Popularidade' },
          { value: { key: 'name', direction: 'asc' }, label: 'Nome A/Z' },
          { value: { key: 'name', direction: 'desc' }, label: 'Nome Z/A' },
        ]}
      />
    </Container>
  );
};

export default Filter;
