import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoadingScreen from './components/common/LoadingScreen';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/customer/Home'));
const Login = lazy(() => import('./pages/customer/Login'));
const Register = lazy(() => import('./pages/customer/Register'));
const SingleBouquet = lazy(() => import('./pages/customer/SingleBouquet'));
const ProductDetail = lazy(() => import('./pages/customer/ProductDetail'));
const CustomizeBouquet = lazy(() => import('./pages/customer/CustomizeBouquet'));
const Events = lazy(() => import('./pages/customer/Events'));
const Cart = lazy(() => import('./pages/customer/Cart'));
const Checkout = lazy(() => import('./pages/customer/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/customer/OrderConfirmation'));
const Account = lazy(() => import('./pages/customer/Account'));
const MyOrders = lazy(() => import('./pages/customer/MyOrders'));
const MyEvents = lazy(() => import('./pages/customer/MyEvents'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/single-bouquet" element={<SingleBouquet />} />
                  <Route path="/single-bouquet/:id" element={<ProductDetail />} />
                  <Route path="/customize" element={<CustomizeBouquet />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />

                  {/* Admin Login Only */}
                  <Route path="/login" element={<Login />} />
                  {/* Admin Login Only */}
                  <Route path="/login" element={<Login />} />

                  {/* Remove customer account routes - no longer needed */}

                  {/* Admin Routes */}
                  <Route
                    path="/admin/*"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
