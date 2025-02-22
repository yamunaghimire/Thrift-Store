// // // // // // // // import React from 'react';
// // // // // // // // import { BsCart2 } from "react-icons/bs";
// // // // // // // // import { Link } from 'react-router-dom';
// // // // // // // // import logo from '../images/logo.png';

// // // // // // // // const Navbar = () => {
// // // // // // // //   return (
// // // // // // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px]  z-50">
// // // // // // // //       <div className="flex items-center">
// // // // // // // //         <img src={logo} alt="Logo" className="w-12 h-12" /> <span className='font-bold'>THRIFTVERSE</span> 
// // // // // // // //       </div>
// // // // // // // //       <div className="flex space-x-8 items-center">
// // // // // // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // // // // // //         <a href="#" className="text-black font-semibold hover:text-gray-400">Categories</a>
// // // // // // // //         <Link
// // // // // // // //           to="/login"
// // // // // // // //           className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors"
// // // // // // // //         >
// // // // // // // //           Log in
// // // // // // // //         </Link>
// // // // // // // //         <a href="#" className="text-black font-semibold">
// // // // // // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors" />
// // // // // // // //         </a>
// // // // // // // //       </div>
// // // // // // // //     </nav>
// // // // // // // //   )
// // // // // // // // };

// // // // // // // // export default Navbar;
// // // // // // import React, { useContext } from 'react';
// // // // // // import { BsCart2 } from "react-icons/bs";
// // // // // // import { Link } from 'react-router-dom';
// // // // // // import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed

// // // // // // import logo from '../images/logo.png';

 
// // // // // // const Navbar = () => {
// // // // // //   const { isAuthenticated, logout } = useAuth();
  
// // // // // //   return (
// // // // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px]  z-50">
// // // // // //       <div className="flex items-center">
// // // // // //         {/* <img src={logo} alt="Logo" className="w-12 h-12" /> */}<span className='text-[20px] font-bold'>THRIFTVERSE</span>  
// // // // // //       </div>
// // // // // //       <div className="flex space-x-8 items-center">
// // // // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // // // //         <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
// // // // // //         {!isAuthenticated ? (
// // // // // //           <Link
// // // // // //             to="/login"
// // // // // //             className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
// // // // // //           >
// // // // // //             Log in
// // // // // //           </Link>
// // // // // //         ) : (
// // // // // //           <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
// // // // // //             Log out
// // // // // //           </button>
// // // // // //         )}
// // // // // //         <Link to="/cart">
// // // // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors relative" /><span className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#f06595] bottom-10 text-white right-[144px] flex items-center justify-center">
// // // // // //   0
// // // // // // </span>

// // // // // //         </Link>
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   );
// // // // // // };

// // // // // // export default Navbar;
// // // // // // src/components/Navbar/Navbar.js
// // // // // // import React, { useContext } from 'react';
// // // // // // import { BsCart2 } from "react-icons/bs";
// // // // // // import { Link } from 'react-router-dom';
// // // // // // import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
// // // // // // import { CartContext } from '../contexts/CartContext'; // Import CartContext

// // // // // // const Navbar = () => {
// // // // // //   const { isAuthenticated, logout } = useAuth();
// // // // // //   const { cartItems } = useContext(CartContext); // Get cartItems from context

// // // // // //   const totalItems = cartItems.length;
// // // // // //   const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

// // // // // //   return (
// // // // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px] z-50">
// // // // // //       <div className="flex items-center">
// // // // // //         <span className='text-[20px] font-bold'>THRIFTVERSE</span>
// // // // // //       </div>
// // // // // //       <div className="flex space-x-8 items-center">
// // // // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // // // //         <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
// // // // // //         {!isAuthenticated ? (
// // // // // //           <Link
// // // // // //             to="/login"
// // // // // //             className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
// // // // // //           >
// // // // // //             Log in
// // // // // //           </Link>
// // // // // //         ) : (
// // // // // //           <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
// // // // // //             Log out
// // // // // //           </button>
// // // // // //         )}
// // // // // //         <Link to="/cart">
// // // // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors relative" />
// // // // // //           <span className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#f06595] bottom-10 text-white right-[144px] flex items-center justify-center">
// // // // // //             {totalItems}
// // // // // //           </span>
// // // // // //         </Link>
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   );
// // // // // // };

// // // // // // export default Navbar;
// // // // // // src/Components/Navbar.js
// // // // // import React, { useContext } from 'react';
// // // // // import { BsCart2 } from "react-icons/bs";
// // // // // import { Link } from 'react-router-dom';
// // // // // import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
// // // // // import { useCart } from '../contexts/CartContext'; // Import the `useCart` hook here

// // // // // import logo from '../images/logo.png';

// // // // // const Navbar = () => {
// // // // //   const { isAuthenticated, logout } = useAuth();
// // // // //   const { cartItems } = useCart(); // Access the cartItems from the CartContext
  
// // // // //   return (
// // // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px] z-50">
// // // // //       <div className="flex items-center">
// // // // //         {/* <img src={logo} alt="Logo" className="w-12 h-12" /> */}<span className='text-[20px] font-bold'>THRIFTVERSE</span>  
// // // // //       </div>
// // // // //       <div className="flex space-x-8 items-center">
// // // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // // //         <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
// // // // //         {!isAuthenticated ? (
// // // // //           <Link
// // // // //             to="/login"
// // // // //             className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
// // // // //           >
// // // // //             Log in
// // // // //           </Link>
// // // // //         ) : (
// // // // //           <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
// // // // //             Log out
// // // // //           </button>
// // // // //         )}
// // // // //         <Link to="/cart">
// // // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors relative" />
// // // // //           <span className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#f06595] bottom-10 text-white right-[144px] flex items-center justify-center">
// // // // //             {cartItems.length}
// // // // //           </span>
// // // // //         </Link>
// // // // //       </div>
// // // // //     </nav>
// // // // //   );
// // // // // };

// // // // // export default Navbar;
// // // // // import React from 'react';
// // // // // import { BsCart2 } from "react-icons/bs";
// // // // // import { Link } from 'react-router-dom';
// // // // // import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
// // // // // import { useCart } from '../contexts/CartContext.js'; // Import the `useCart` hook here



// // // // // const Navbar = () => {
// // // // //   const { isAuthenticated, logout } = useAuth();
// // // // //   const { cartItems } = useCart(); // Access the cartItems and addToCart from the CartContext
  


// // // // //   return (
// // // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px] z-50">
// // // // //       <div className="flex items-center">
// // // // //         <Link to="/"> <span className='text-[20px] font-bold'>THRIFTVERSE</span>  </Link>
// // // // //       </div>
// // // // //       <div className="flex space-x-8 items-center">
// // // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // // //         <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
// // // // //         {!isAuthenticated ? (
// // // // //           <Link
// // // // //             to="/login"
// // // // //             className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
// // // // //           >
// // // // //             Log in
// // // // //           </Link>
// // // // //         ) : (
// // // // //           <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
// // // // //             Log out
// // // // //           </button>
// // // // //         )}
// // // // //         <Link to="/cart">
// // // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors relative" />
// // // // //           <span className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#f06595] bottom-10 text-white right-[144px] flex items-center justify-center">
// // // // //             {cartItems.length}
// // // // //           </span>
// // // // //         </Link>
// // // // //       </div>
// // // // //     </nav>
// // // // //   );
// // // // // };

// // // // // export default Navbar;

// // // // //Navbar.js
// // // // import React from 'react';
// // // // import { BsCart2 } from "react-icons/bs";
// // // // import { Link } from 'react-router-dom';
// // // // import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed
// // // // import { useCart } from '../contexts/CartContext.js'; // Import the `useCart` hook here

// // // // const Navbar = () => {
// // // //   const { isAuthenticated, logout, user } = useAuth();  // Assuming `user` has the role information
// // // //   const { cartItems } = useCart(); // Access the cartItems from the CartContext

// // // //   return (
// // // //     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px] z-50">
// // // //       <div className="flex items-center">
// // // //         <Link to="/"> <span className='text-[20px] font-bold'>THRIFTVERSE</span>  </Link>
// // // //       </div>
// // // //       <div className="flex space-x-8 items-center">
// // // //         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
// // // //         <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
// // // //         {!isAuthenticated ? (
// // // //           <Link
// // // //             to="/login"
// // // //             className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
// // // //           >
// // // //             Log in
// // // //           </Link>
// // // //         ) : (
// // // //           <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
// // // //             Log out
// // // //           </button>
// // // //         )}
// // // //         <Link to="/cart">
// // // //           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors relative" />
// // // //           <span className="absolute w-[20px] h-[20px] rounded-[50%] bg-[#f06595] bottom-10 text-white right-[144px] flex items-center justify-center">
// // // //             {cartItems.length}
// // // //           </span>
// // // //         </Link>
        
// // // //         {/* Admin Link: Render only if user is authenticated and is an admin */}
// // // //         {isAuthenticated && user && user.role === 'admin' && (
// // // //           <Link
// // // //             to="/admin"
// // // //             className="text-black font-semibold hover:text-gray-400"
// // // //           >
// // // //             Admin
// // // //           </Link>
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;



import React, { useState, useRef } from 'react';  
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext.js';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartItems } = useCart(); 

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navbarRef = useRef(null); // Create a reference for the Navbar

  // Show dropdown on mouse enter
  const handleMouseEnter = () => setIsDropdownVisible(true);

  // Hide dropdown when mouse leaves the Navbar area
  const handleMouseLeave = () => setIsDropdownVisible(false);

  return (
    <nav 
      ref={navbarRef} 
      className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px] z-50 shadow-lg"
      onMouseLeave={handleMouseLeave} // Close dropdown when mouse leaves the entire Navbar
    >
      <div className="flex items-center">
        <Link to="/"> <span className='text-[20px] font-bold text-black'>THRIFTVERSE</span>  </Link>
      </div>
      <div className="flex space-x-8 items-center">
        <Link to="/" className="text-black font-semibold hover:text-[#f06595] transition-colors">Home</Link>
        <Link to="/about" className="text-black font-semibold hover:text-[#f06595] ">About</Link>
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="px-4 py-1 border-2 border-[#f06595] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors"
          >
            Log in
          </Link>
        ) : (
          <button onClick={logout} className="px-4 py-1 border-2 border-[#f48eb1] text-black font-semibold hover:bg-[#f06595] hover:text-white transition-colors">
            Log out
          </button>
        )}

        <div className="relative flex items-center">
          <Link to="/cart">
            <BsCart2 className="text-[30px] hover:text-[#f06595] transition-colors" />
            <span className="absolute w-[20px] h-[20px] rounded-full bg-[#f06595] top-[-5px] right-[-5px] text-white text-[12px] flex items-center justify-center">
              {cartItems.length}
            </span>
          </Link>
        </div>

        {/* Admin Link: Render only if user is authenticated and is an admin */}
        {isAuthenticated && user && user.role === 'admin' && (
          <div 
            className="relative" 
            onMouseEnter={handleMouseEnter}
          >
            <Link
              to="#"
              className="text-black font-semibold hover:text-gray-400 transition-colors"
            >
              Admin
            </Link>
            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div 
                className="absolute top-[50px] right-[-120px] bg-white shadow-lg border border-gray-400 w-[250px] py-4 px-6 rounded-lg"
                onMouseEnter={handleMouseEnter} // Keep dropdown visible when hovering over it
              >
                <Link
                  to="/upload"
                  className="block text-sm text-black hover:text-[#f06595] font-semibold mb-2 transition-colors"
                >
                  Upload Product
                </Link>
                <Link
                  to="/userdetails"
                  className="block text-sm text-black hover:text-[#f06595] font-semibold mb-2 transition-colors"
                >
                  Users
                </Link>
                <Link
                  to="/ordermanagement"
                  className="block text-sm text-black hover:text-[#f06595] font-semibold transition-colors"
                >
                  Orders
                </Link>
                <Link
                  to="/admin/products"
                  className="block text-sm text-black hover:text-[#f06595] font-semibold transition-colors"
                >
                  Manage
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
