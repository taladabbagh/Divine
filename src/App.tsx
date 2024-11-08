import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '../styles/globals.css'
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';  
import { ToastContainer } from 'react-toastify';
import Registration from './pages/Registration';
import ProductDetails from './pages/ProductDetails';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  const location = useLocation();

  return (
    <div>
      {/* Render Header on all pages except the homepage */}
      {location.pathname !== '/' && <Header />}

      <ToastContainer position="top-right" autoClose={3000} />
      
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} /> {/* New Route */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/register" element={<Registration />} />
    </Routes>

    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
