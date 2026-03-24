import { createBrowserRouter } from 'react-router';
import Layout from '../Layout/Layout';
import HomePage from '../pages/HomePage';
import Caps from '../pages/Caps';
import DropshoulderHoodie from '../pages/DropshoulderHoodie';
import Hoodie from '../pages/Hoodie';
import SweatShirt from '../pages/SweatShirt';
import Wallet from '../pages/Wallet';
import Shoes from '../pages/Shoes';
import OfferPage from '../pages/OfferPage';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import WishlistPage from '../pages/WishlistPage';
import Login from '../SignInUp/Login';
import SignUpPage from '../SignInUp/SignUpPage';
import Verify from '../SignInUp/Verify';
import CreateNew from '../SignInUp/CreateNew';
import Sucessfull from '../SignInUp/Sucessfull';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'caps', element: <Caps /> },
      { path: 'dropshoulderhoodie', element: <DropshoulderHoodie /> },
      { path: 'hoodie', element: <Hoodie /> },
      { path: 'sweatshirt', element: <SweatShirt /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'shoes', element: <Shoes /> },
      { path: 'offers', element: <OfferPage /> },
      { path: 'product', element: <ProductDetail /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'verify', element: <Verify /> },
      { path: 'create-new', element: <CreateNew /> },
      { path: 'successfull', element: <Sucessfull /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
