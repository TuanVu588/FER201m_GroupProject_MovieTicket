import CartPage from '@/pages/Cart';
import CheckoutPage from '@/pages/Checkout';
const publicRoutes = [

  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
