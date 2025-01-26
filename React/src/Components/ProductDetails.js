// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import { useCart } from "../contexts/CartContext.js";  

// // const ProductDetails = () => {
// //   const { id } = useParams(); // Get the product ID from the URL
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { addToCart, cartItems } = useCart(); // Destructure cartItems from useCart()
// //   const [cartVisible, setCartVisible] = useState(false); // For toggling cart view

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:8080/api/products/${id}`);
// //         setProduct(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError("Failed to load product details");
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [id]);

// //   const handleAddToCart = () => {
// //     if (!product) return; // Prevent adding null or undefined products

// //     // Add product to the cart via context
// //     addToCart(product);
// //     setCartVisible(true); // Show cart after adding item
// //   };

// //   if (loading) return <p>Loading product details...</p>;
// //   if (error) return <p className="text-red-500">{error}</p>;
// //   if (!product) return <p>Product not found</p>;

// //   return (
// //     <div className="relative p-[180px] grid grid-cols-2">
// //       {/* Product Image */}
// //       <div className="flex-1 max-w-[550px] border-2 rounded-md">
// //         <img
// //           src={product.image}
// //           alt={product.name}
// //           className="rounded-md w-full object-cover"
// //         />
// //       </div>

// //       {/* Product Details */}
// //       <div className="mt-10">
// //         <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
// //         <p className="text-pink-500 text-xl font-semibold mt-2">
// //           Rs {product.price}
// //         </p>
// //         <div className="mt-6">
// //           <button
// //             className="bg-pink-500 text-white px-4 py-2 rounded-md w-[200px]"
// //             onClick={handleAddToCart}
// //           >
// //             Add to Cart
// //           </button>
// //         </div>
// //         <div className="mt-6">
// //           <h2 className="text-lg font-semibold">Description</h2>
// //           <p className="mt-2">{product.description}</p>
// //         </div>
// //       </div>

// //       {/* Cart Layout */}
// //       <div
// //         className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ${cartVisible ? "translate-x-0" : "translate-x-full"}`}
// //       >
// //         <div className="relative p-4">
// //           {/* Close Button */}
// //           <button
// //             className="absolute top-2 right-2 text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600 shadow-lg z-50"
// //             onClick={() => setCartVisible(false)} // Close cart
// //           >
// //             ✕
// //           </button>
// //           <h2 className="text-xl font-bold mt-10">Cart</h2>
// //           <div className="mt-6">
// //             {cartItems.length > 0 ? (
// //               cartItems.map((item, index) => (
// //                 <div key={index} className="flex items-center space-x-4 mb-4">
// //                   <img
// //                     src={item.image}
// //                     alt={item.name}
// //                     className="w-16 h-16 rounded-md"
// //                   />
// //                   <div>
// //                     <h3 className="font-semibold">{item.name}</h3>
// //                     <p className="text-pink-500">Rs {item.price}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>Your cart is empty</p>
// //             )}
// //           </div>
// //           {cartItems.length > 0 && (
// //             <div className="mt-4">
// //               <p className="font-semibold">
// //                 Total: Rs{" "}
// //                 {cartItems.reduce((total, item) => total + item.price, 0)}
// //               </p>
// //               <button className="bg-pink-500 text-white w-full py-2 rounded-md mt-4">
// //                 Checkout
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useCart } from "../contexts/CartContext.js";  

// const ProductDetails = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { addToCart, cartItems, removeFromCart } = useCart(); // Destructure cartItems and removeFromCart
//   const [cartVisible, setCartVisible] = useState(false); // For toggling cart view

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/products/${id}`);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load product details");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!product) return; // Prevent adding null or undefined products
//     addToCart(product); // Add product to cart
//     setCartVisible(true); // Show cart after adding item
//   };

//   const handleRemoveFromCart = (productId) => {
//     removeFromCart(productId); // Remove the product by ID
//   };

//   if (loading) return <p>Loading product details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!product) return <p>Product not found</p>;

//   return (
//     <div className="relative p-[180px] grid grid-cols-2">
//       {/* Product Image */}
//       <div className="flex-1 max-w-[550px] border-2 rounded-md">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="rounded-md w-full object-cover"
//         />
//       </div>

//       {/* Product Details */}
//       <div className="mt-10">
//         <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
//         <p className="text-pink-500 text-xl font-semibold mt-2">
//           Rs {product.price}
//         </p>
//         <div className="mt-6">
//           <button
//             className="bg-pink-500 text-white px-4 py-2 rounded-md w-[200px]"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </button>
//         </div>
//         <div className="mt-6">
//           <h2 className="text-lg font-semibold">Description</h2>
//           <p className="mt-2">{product.description}</p>
//         </div>
//       </div>

//       {/* Cart Layout */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ${cartVisible ? "translate-x-0" : "translate-x-full"}`}
//       >
//         <div className="relative p-4">
//           {/* Close Button */}
//           <button
//             className="absolute top-2 right-2 text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600 shadow-lg z-50"
//             onClick={() => setCartVisible(false)} // Close cart
//           >
//             ✕
//           </button>
//           <h2 className="text-xl font-bold mt-10">Cart</h2>
//           <div className="mt-6">
//             {cartItems.length > 0 ? (
//               cartItems.map((item, index) => (
//                 <div key={index} className="flex items-center space-x-4 mb-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-16 h-16 rounded-md"
//                   />
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <p className="text-pink-500">Rs {item.price}</p>
//                     <button
//                       className="text-red-500 mt-2"
//                       onClick={() => handleRemoveFromCart(item.id)} // Remove item from cart
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>Your cart is empty</p>
//             )}
//           </div>
//           {cartItems.length > 0 && (
//             <div className="mt-4">
//               <p className="font-semibold">
//                 Total: Rs{" "}
//                 {cartItems.reduce((total, item) => total + item.price, 0)}
//               </p>
//               <button className="bg-pink-500 text-white w-full py-2 rounded-md mt-4">
//                 Checkout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext.js";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cartItems, removeFromCart } = useCart(); // Destructure cartItems and removeFromCart
  const [cartVisible, setCartVisible] = useState(false); // For toggling cart view

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return; // Prevent adding null or undefined products
    addToCart(product); // Add product to cart
    setCartVisible(true); // Show cart after adding item
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Remove the product by ID
  };

  const isProductInCart = cartItems.some(item => item._id === product?._id); // Check if this product is already in cart

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="relative p-[180px] grid grid-cols-2">
      {/* Product Image */}
      <div className="flex-1 max-w-[550px] border-2 rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-md w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
        <p className="text-pink-500 text-xl font-semibold mt-2">
          Rs {product.price}
        </p>
        <div className="mt-6">
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-md w-[200px]"
            onClick={handleAddToCart}
            disabled={isProductInCart} // Disable button if product is already in the cart
          >
            {isProductInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mt-2">{product.description}</p>
        </div>
      </div>

      {/* Cart Layout */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transition-transform duration-300 ${cartVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="relative p-4">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-white bg-pink-500 p-2 rounded-full hover:bg-pink-600 shadow-lg z-50"
            onClick={() => setCartVisible(false)} // Close cart
          >
            ✕
          </button>
          <h2 className="text-xl font-bold mt-10">Cart</h2>
          <div className="mt-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-pink-500">Rs {item.price}</p>
                    <button
                      className="text-red-500 mt-2"
                      onClick={() => handleRemoveFromCart(item._id)} // Remove item from cart
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">
                Total: Rs{" "}
                {cartItems.reduce((total, item) => total + item.price, 0)}
              </p>
              <button className="bg-pink-500 text-white w-full py-2 rounded-md mt-4">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

