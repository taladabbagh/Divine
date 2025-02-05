import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/useAuth'; 
import '../styles/globals.css';
import '../styles/header.css';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';  
import { ToastContainer } from 'react-toastify';
import Registration from './pages/Registration/Registration';
import Admin from './admin/pages/Dashboard';
import ProductDetails from './pages/ProductDetails';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import { ModalProvider } from './Context/ModalContext';

function App() {
  return (
          <ModalProvider>
    <div>

      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>

    </div>
      </ModalProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <UserProvider> 
        <App />
      </UserProvider>
    </Router>
  );
}
