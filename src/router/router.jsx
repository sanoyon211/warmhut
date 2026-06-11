import { createBrowserRouter } from 'react-router';
import Layout from '../Layout/Layout';
import HomePage from '../pages/HomePage';
import Shop from '../pages/Shop';
import OfferPage from '../pages/OfferPage';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import Checkout from '../pages/Checkout';
import WishlistPage from '../pages/WishlistPage';
import Login from '../SignInUp/Login';
import SignUpPage from '../SignInUp/SignUpPage';
import Sucessfull from '../SignInUp/Sucessfull';
import ProtectedRoute from '../components/ProtectedRoute';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import SearchResults from '../pages/SearchResults';
import FAQ from '../pages/FAQ';
import ReturnPolicy from '../pages/ReturnPolicy';
import ContactUs from '../pages/ContactUs';
import DeliveryPolicy from '../pages/DeliveryPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <Shop title="All Products" /> },
      { path: 'caps', element: <Shop category="Caps" title="Caps Collection" /> },
      { path: 'dropshoulderhoodie', element: <Shop category="Dropshoulder Hoodie" title="Dropshoulder Hoodies" /> },
      { path: 'hoodie', element: <Shop category="Hoodie" title="Premium Hoodies" /> },
      { path: 'sweatshirt', element: <Shop category="Sweatshirt" title="Cozy Sweatshirts" /> },
      { path: 'wallet', element: <Shop category="Wallet" title="Leather Wallets" /> },
      { path: 'shoes', element: <Shop category="Shoes" title="Shoes & Sneakers" /> },
      { path: 'offers', element: <OfferPage /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'return-policy', element: <ReturnPolicy /> },
      { path: 'delivery-policy', element: <DeliveryPolicy /> },
      { path: 'terms', element: <TermsAndConditions /> },
      { path: 'contact', element: <ContactUs /> },
      { path: 'product', element: <ProductDetail /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'successfull', element: <Sucessfull /> },
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ) 
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  { 
    path: '/admin', 
    element: (
      <ProtectedRoute adminOnly={true}>
        <AdminDashboard />
      </ProtectedRoute>
    ) 
  },
]);

export default router;
