import { createBrowserRouter } from 'react-router';
import Root from './Root';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: 'catalog', Component: CatalogPage },
      { path: 'product/:id', Component: ProductPage },
      { path: 'checkout', Component: CheckoutPage },
    ],
  },
], {
  basename: '/Amattdenim/',
});
