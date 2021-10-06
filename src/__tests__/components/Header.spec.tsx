import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import Header from '../../components/Header';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

jest.mock('../../hooks/useCart', () => {
  return {
    useCart: () => ({
      cart: [
        {
          amount: 2,
          id: 312,
          image:'super-mario-odyssey.png',
          price: 197.88,
          name: 'Super Mario Odyssey',
        },
        {
          amount: 1,
          id: 202,
          image:'call-of-duty-infinite-warfare.png',
          price: 49.99,
          name: 'Call Of Duty Infinite Warfare"',
        },
      ],
    }),
  };
});

describe('Header Component', () => {
  it('should be able to render the amount of products added to cart', () => {
    const { getByTestId } = render(<Header />);

    const cartSizeCounter = getByTestId('cart-size');
    expect(cartSizeCounter).toHaveTextContent('2 itens');
  });
});
