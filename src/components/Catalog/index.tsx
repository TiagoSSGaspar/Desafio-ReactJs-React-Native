import React, {useEffect } from "react";
import { useProductList } from "../../hooks/useProductList";

import { api } from "../../services/api";
import CatalogItem from "../CatalogItem";
import { Container } from "./styles";


const Catalog: React.FC = () => {
  const {products, setProducts} = useProductList()

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      setProducts(response.data)
    }
    loadProducts();
  }, [setProducts]);

  return (
    <Container>
      {
        products.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))
      }
    </Container>
  );
}

export default Catalog;
