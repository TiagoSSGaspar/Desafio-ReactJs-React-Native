import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../shared/types';

interface IProductListProviderProps {
  children: ReactNode;
}

interface IProductListContextData {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>
}

const DEFAULT_VALUE = {
  product: [],
  setProduct: () => {}
}

const ProductListContext = createContext<IProductListContextData>(DEFAULT_VALUE);

export function ProductListProvider({ children }: IProductListProviderProps): JSX.Element {
  const [product, setProduct] = useState<Product[]>(DEFAULT_VALUE.product);

  return (
    <ProductListContext.Provider value={{product, setProduct}}>
      {children}
    </ProductListContext.Provider>
  );
}

export function useProductList(): IProductListContextData {
  const context = useContext(ProductListContext);

  return context;
}
