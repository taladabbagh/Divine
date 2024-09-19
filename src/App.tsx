import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';  // Import your Header component with the cart icon
import { ToastContainer } from 'react-toastify';
import Registration from './pages/Registration';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        {/* Header with cart icon will be displayed on all pages */}
        <Header />
        
        {/* Toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Define routes for your pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Registration />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
