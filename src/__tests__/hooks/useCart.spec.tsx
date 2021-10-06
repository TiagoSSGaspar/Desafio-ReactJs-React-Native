import { renderHook, act } from '@testing-library/react-hooks';
import AxiosMock from 'axios-mock-adapter';

import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { useCart, CartProvider } from '../../hooks/useCart';

const apiMock = new AxiosMock(api);

jest.mock('react-toastify');

const mockedToastError = toast.error as jest.Mock;
const mockedSetItemLocalStorage = jest.spyOn(Storage.prototype, 'setItem');
const initialStoragedData = [
  {
    id: 312,
    amount: 2,
    image:'super-mario-odyssey.png',
    price: 197.88,
    name: 'Super Mario Odyssey',
  },
  {
    id: 202,
    amount: 1,
    image:'call-of-duty-infinite-warfare.png',
    price: 49.99,
    name: 'Call Of Duty Infinite Warfare"',
  },
];

describe('useCart Hook', () => {
  beforeEach(() => {
    apiMock.reset();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValueOnce(JSON.stringify(initialStoragedData));
  });

  it('should be able to initialize cart with localStorage value', () => {
    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 312,
          amount: 2,
          image:'super-mario-odyssey.png',
          price: 197.88,
          name: 'Super Mario Odyssey',
        },
        {
          id: 202,
          amount: 1,
          image:'call-of-duty-infinite-warfare.png',
          price: 49.99,
          name: 'Call Of Duty Infinite Warfare"',
        },
      ])
    );
  });

  it('should be able to add a new product', async () => {
    const productId = 3;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 102,
      amount: 2,
    });
    apiMock.onGet(`products/${productId}`).reply(200, {
      id: 102,
      name: "The Witcher III Wild Hunt",
      price: 119.5,
      image: "the-witcher-iii-wild-hunt.png"
    });

    const { result, waitForNextUpdate } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitForNextUpdate({ timeout: 200 });

    expect(result.current.cart).toEqual(
      expect.arrayContaining([
        {
          id: 312,
          amount: 2,
          image:'super-mario-odyssey.png',
          price: 197.88,
          name: 'Super Mario Odyssey',
        },
        {
          id: 202,
          amount: 1,
          image:'call-of-duty-infinite-warfare.png',
          price: 49.99,
          name: 'Call Of Duty Infinite Warfare"',
        },
        {
          id: 102,
          amount: 1,
          name: "The Witcher III Wild Hunt",
          price: 119.5,
          image: "the-witcher-iii-wild-hunt.png"
        },
      ])
    );
    expect(mockedSetItemLocalStorage).toHaveBeenCalledWith(
      '@SuperaGames:cart',
      JSON.stringify(result.current.cart)
    );
  });

  it('should not be able add a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);
    apiMock.onGet(`products/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.addProduct(productId);
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na adição do produto'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should not be able to remove a product that does not exist', () => {
    const productId = 3;

    const { result } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.removeProduct(productId);
    });

    expect(mockedToastError).toHaveBeenCalledWith('Erro na remoção do produto');
    expect(result.current.cart).toEqual(
      expect.arrayContaining(initialStoragedData)
    );
    expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
  });

  it('should not be able to update a product that does not exist', async () => {
    const productId = 4;

    apiMock.onGet(`stock/${productId}`).reply(404);

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 3, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Erro na alteração de quantidade do produto'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should not be able to update a product amount when running out of stock', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 202,
      amount: 1,
    });

    const { result, waitFor } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 2, productId });
    });

    await waitFor(
      () => {
        expect(mockedToastError).toHaveBeenCalledWith(
          'Quantidade solicitada fora de estoque'
        );
        expect(result.current.cart).toEqual(
          expect.arrayContaining(initialStoragedData)
        );
        expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
      },
      { timeout: 200 }
    );
  });

  it('should not be able to update a product amount to a value smaller than 1', async () => {
    const productId = 2;

    apiMock.onGet(`stock/${productId}`).reply(200, {
      id: 202,
      amount: 1,
    });

    const { result, waitForValueToChange } = renderHook(useCart, {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.updateProductAmount({ amount: 0, productId });
    });

    try {
      await waitForValueToChange(
        () => {
          return result.current.cart;
        },
        { timeout: 50 }
      );
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    } catch {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.cart).toEqual(
        expect.arrayContaining(initialStoragedData)
      );
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockedSetItemLocalStorage).not.toHaveBeenCalled();
    }
  });
});
