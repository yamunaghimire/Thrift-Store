import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCart } from "../contexts/CartContext"; 

const OrderSuccess = () => {
  const { clearCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Order Placed Successfully!</h1>
      <p className="text-lg mb-4">Thank you for shopping with us. Your order has been successfully placed.</p>
      <p className="mb-4">You will receive a confirmation email shortly.</p>

      

      <button
        onClick={handleGoHome}
        className="bg-pink-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
