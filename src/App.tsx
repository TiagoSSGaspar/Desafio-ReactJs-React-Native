import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes/routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import { ProductListProvider } from './hooks/useProductList';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
    <ProductListProvider>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Routes />
        <ToastContainer autoClose={2000} />
      </CartProvider>
    </ProductListProvider>
    </BrowserRouter>
  );
};

export default App;
