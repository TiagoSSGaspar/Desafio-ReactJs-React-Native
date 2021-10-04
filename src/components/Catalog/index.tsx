import React, { useEffect, useState } from "react";

import { api } from "../../services/api";
import { Product } from "../../types";
import CatalogItem from "../CatalogItem";
import { Container } from "./styles";

interface ProductFormatted extends Product {
  priceFormatted: string;
}

const Catalog: React.FC = () => {
  const [catalog, setCatalog] = useState<ProductFormatted[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const productsFormated = response.data
      setCatalog(productsFormated)
    }

    loadProducts();
  }, []);

  return (
    <Container>
      {
        catalog.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))
      }
    </Container>
  );
}

export default Catalog;
