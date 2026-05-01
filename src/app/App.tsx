import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { Loader } from './components/Loader';

export default function App() {
  return (
    <CartProvider>
      <Loader />
      <RouterProvider router={router} />
    </CartProvider>
  );
}
