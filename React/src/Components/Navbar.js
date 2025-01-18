// import React from 'react';
// import { BsCart2 } from "react-icons/bs";
// import { Link } from 'react-router-dom';
// import logo from '../images/logo.png';

// const Navbar = () => {
//   return (
//     <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px]  z-50">
//       <div className="flex items-center">
//         <img src={logo} alt="Logo" className="w-12 h-12" /> <span className='font-bold'>THRIFTVERSE</span> 
//       </div>
//       <div className="flex space-x-8 items-center">
//         <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
//         <a href="#" className="text-black font-semibold hover:text-gray-400">Categories</a>
//         <Link
//           to="/login"
//           className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors"
//         >
//           Log in
//         </Link>
//         <a href="#" className="text-black font-semibold">
//           <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors" />
//         </a>
//       </div>
//     </nav>
//   )
// };

// export default Navbar;
import React from 'react';
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed

import logo from '../images/logo.png';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed w-full h-[80px] flex justify-between items-center bg-white px-[150px]  z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12" /> <span className='font-bold'>THRIFTVERSE</span> 
      </div>
      <div className="flex space-x-8 items-center">
        <Link to="/" className="text-black font-semibold hover:text-gray-400">Home</Link>
        <Link to="/about" className="text-black font-semibold hover:text-gray-400">About</Link>
        {!isAuthenticated ? (
          <Link
            to="/login"
            className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors"
          >
            Log in
          </Link>
        ) : (
          <button onClick={logout} className="px-4 py-1 border-2 border-gray-300 text-black font-semibold hover:bg-gray-400 hover:text-white transition-colors">
            Log out
          </button>
        )}
        <Link to="/payment">
          <BsCart2 className="text-[30px] hover:text-gray-400 transition-colors" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
