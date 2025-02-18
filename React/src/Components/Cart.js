//Cart.js
import React from "react";
import { useCart } from "../contexts/CartContext"; 
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); 

  const handleCheckout = () => {
    
    alert("Proceeding to checkout...");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-pink-500">Rs {item.price}</p>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)} 
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-semibold">
              Total: Rs{" "}
              {cartItems.reduce((total, item) => total + item.price, 0)}
            </p>
            <Link to="/checkout" ><button
              onClick={handleCheckout}
              className="bg-pink-500 text-white w-full py-2 rounded-md mt-4"
            >
              Proceed
            </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="pt-5">Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;

