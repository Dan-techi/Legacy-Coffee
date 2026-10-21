import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Home.jsx'
import AboutUs from './AboutUs.jsx'
import Shop from './Shop.jsx'
import PartnerWithUs from './PartnerWithUs.jsx'
import ContactUs from './ContactUs.jsx'
import Newsletter from './Newsletter.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import ProductPage from './ProductPage.jsx'
import CartPage from './CartPage.jsx'
import CheckoutPage from './CheckoutPage.jsx'
import ConfirmationPage from './ConfirmationPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import AuthPage from './AuthPage.jsx'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><AboutUs /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/products/:productId" element={<Layout><ProductPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/signin" element={<Layout><AuthPage mode="signin" /></Layout>} />
            <Route path="/signup" element={<Layout><AuthPage mode="signup" /></Layout>} />
            <Route path="/confirm" element={<Layout><ConfirmationPage /></Layout>} />
            <Route path="/partner" element={<Layout><PartnerWithUs /></Layout>} />
            <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
            <Route path="/newsletter" element={<Layout><Newsletter /></Layout>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
