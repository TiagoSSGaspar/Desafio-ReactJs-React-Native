import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { Product } from '../../shared/model/types';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';

import Button from '../Button';
import { ProductList } from './styles';

interface ICatalogItem {
  product: Product
}

interface CartItemsAmount {
  [key: number]: number;
}

const CatalogItem: React.FC<ICatalogItem> = ({product}) => {
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount
    return sumAmount
  }, {} as CartItemsAmount)

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      <img src={`images/${product.image}`} alt={product.name} />
      <strong>{product.name}</strong>
      <span>{formatPrice(product.price)}</span>
      <Button
        type="button"
        data-testid="add-product-button"
        onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {cartItemsAmount[product.id] || 0}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </Button>
    </ProductList>
  );
};

export default CatalogItem;
