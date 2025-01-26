import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if the item is already in the cart
    if (cartItems.some(item => item._id === product._id)) {
      return; // If item exists, do nothing
    }
    setCartItems([...cartItems, product]); // Add the product to the cart
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId)); // Remove item by productId
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
