import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Collections from './Components/Collections';
import Footer from './Components/Footer';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import About from './Pages/About';
import Login from './Components/Login';
import ProductList from './Pages/productList';
import AdminUpload from './Pages/AdminUpload';
import ProductCard from './Components/ProductCard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProductDetails from './Components/ProductDetails';
import CartPage from './Components/Cart';
import Checkout from './Pages/Checkout';
import OrderSuccess from './Pages/OrderSuccess';
import CategoryPage from './Components/Category';
import Admin from './Components/admin';
import OrdersTable from './Pages/OrderTable';
import AdminProductManagement from "./Pages/AdminProductManagement";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return ( 
    <AuthProvider>
      <Router>
        <div className="font-sans">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Collections />
                  

                  <Footer />
                 
                  
                  
                 
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userdetails" element={<Admin/>} />

            <Route path="/about" element={<About />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/upload" element={<AdminUpload />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/orders" element={<OrdersTable/>} />
           
            

            
            {/* Protected routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            
            <Route path="/productcard" element={<ProductCard />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/admin/products" element={<AdminProductManagement />} />
          </Routes>

          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
