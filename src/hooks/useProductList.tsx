import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../shared/model/types';

interface IProductListProviderProps {
  children: ReactNode;
}

interface IProductListContextData {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const DEFAULT_VALUE = {
  products: [] as Product[],
  setProducts: () => {}
}

const ProductListContext = createContext<IProductListContextData>(DEFAULT_VALUE);

export function ProductListProvider({ children }: IProductListProviderProps): JSX.Element {
  const [products, setProducts] = useState<Product[]>(DEFAULT_VALUE.products);

  return (
    <ProductListContext.Provider value={{products, setProducts}}>
      {children}
    </ProductListContext.Provider>
  );
}

export function useProductList(): IProductListContextData {
  const context = useContext(ProductListContext);

  return context;
}
