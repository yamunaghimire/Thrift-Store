// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Navbar from './Components/Navbar';
// // import Hero from './Components/Hero';
// // import Collections from './Components/Collections';

// // import Footer from './Components/Footer';
// // import Register from './Components/Register';

// // import { ToastContainer } from 'react-toastify'; 
// // import About from './Pages/About';
// // import WhyChooseUs from './Components/Why';
// // import NewArrivals from './Components/NewArrivals';
// // import Login from './Components/Login';
// // import Admin from './Components/admin';
// // import ProductList from './Pages/productList';
// // import AdminUpload from './Pages/AdminUpload';
// // import ProductCard from './Components/ProductCard';



// // const App = () => {
// //   return (
// //     <Router>
// //       <div className="font-sans">
// //         <Navbar />
// //         <Routes>
// //           <Route path="/" element={
// //             <>
// //               <Hero />
// //               <Collections />
// //               <NewArrivals />
// //               <WhyChooseUs/>
// //               <Footer />
// //               <Register/>
// //               <ProductCard/>
// //               <ProductList/>
// //               <AdminUpload/>
              
              

// //             </>
// //           } />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/login" element={<Login/>} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/admin" element={<Admin/>} />
// //           <Route path="/productcard" element={<ProductCard/>} />
// //           <Route path="/productlist" element={<ProductList/>} />
// //           <Route path="/adminupload" element={<AdminUpload/>} />

// //         </Routes>
    
// //         <ToastContainer />
// //       </div>
// //     </Router>
// //   );
// // };


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Collections from './Components/Collections';
import Footer from './Components/Footer';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import About from './Pages/About';
import WhyChooseUs from './Components/Why';
import NewArrivals from './Components/NewArrivals';
import Login from './Components/Login';
// import Admin from './Components/Admin';
import ProductList from './Pages/productList';
import AdminUpload from './Pages/AdminUpload';
import ProductCard from './Components/ProductCard';
import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './Components/ProtectedRoute';

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
                  <NewArrivals />
                  <WhyChooseUs />
                  <ProductList/>
                  <Footer />
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/productlist" element={<ProductList />} />
          
            <Route path="/upload" element={<AdminUpload />} />
            
            {/* <Route
              path="/admin"
              element={<ProtectedRoute element={<Admin />} isAdminRoute={true} />}
            /> */}
            {/* <Route
              path="/upload"
              element={<ProtectedRoute element={<AdminUpload />} isAdminRoute={true} />}
            /> */}
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/productcard" element={<ProductCard />} />
          </Routes>

          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
