import React, { useEffect, useState } from "react";
import { useProductList } from "../../hooks/useProductList";

import { api } from "../../services/api";
import CatalogItem from "../CatalogItem";
import { Container } from "./styles";


const Catalog: React.FC = () => {
  const {product,setProduct} = useProductList()

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const productsFormated = response.data
      setProduct(productsFormated)
    }

    loadProducts();
  }, [setProduct]);

  return (
    <Container>
      {
        product.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))
      }
    </Container>
  );
}

export default Catalog;
