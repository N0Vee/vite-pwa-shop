import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
          <Header />
          <Routes>
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          </Routes>
          <BottomNavigation />
          <PWABadge />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
