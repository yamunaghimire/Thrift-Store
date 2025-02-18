// // // Checkout.js
// // import React, { useState } from "react";
// // import { useCart } from "../contexts/CartContext"; 
// // import { useNavigate } from "react-router-dom";
// // import {jwtDecode} from "jwt-decode"; 

// // const Checkout = () => {
// //   const { cartItems, clearCart } = useCart(); 
// //   const [shippingAddress, setShippingAddress] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const navigate = useNavigate();

// //   const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

// //   // Retrieve the token from localStorage
// //   const token = localStorage.getItem("token");

// //   let userId = null;
// //   if (token) {
// //     try {
// //       const decodedToken = jwtDecode(token);
// //       console.log("Decoded Token:", decodedToken); 
// //       userId = decodedToken.id || decodedToken.userId; 
// //     } catch (error) {
// //       console.error("Invalid token:", error);
// //       alert("Session expired. Please log in again.");
// //       navigate("/login");
// //     }
// //   }

// //   const handleOrder = async () => {
// //     if (!shippingAddress.trim()) {
// //       alert("Please enter a valid shipping address.");
// //       return;
// //     }

// //     if (!userId) {
// //       alert("You must be logged in to place an order.");
// //       navigate("/login");
// //       return;
// //     }

// //     const order = {
// //       items: cartItems.map((item) => ({
// //         product: item._id, 
// //         price: item.price,
// //       })),
// //       shippingAddress,
// //       paymentMethod,
// //       totalAmount,
// //     };

// //     try {
// //       const response = await fetch("http://localhost:8080/api/order", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, //  token for authentication
// //         },
// //         body: JSON.stringify(order),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         alert("Order placed successfully!");
// //         clearCart(); 
// //         navigate("/ordersuccess"); 
// //       } else {
// //         console.error("Order placement failed:", data);
// //         alert(data.message || "Failed to place the order.");
// //       }
// //     } catch (error) {
// //       console.error("Error placing order:", error);
// //       alert("An error occurred while placing the order. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="p-8 mt-4">
// //       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
// //       <div className="mb-4">
// //         <h2 className="text-lg font-semibold">Order Summary</h2>
// //         {cartItems.map((item, index) => (
// //           <div key={index} className="flex items-center space-x-4 mb-2">
// //             <img
// //               src={item.image}
// //               alt={item.name}
// //               className="w-16 h-16 rounded-md"
// //             />
// //             <div>
// //               <h3 className="font-semibold">{item.name}</h3>
// //               <p className="text-pink-500">Rs {item.price}</p>
// //             </div>
// //           </div>
// //         ))}
// //         <p className="font-bold mt-4">Total: Rs {totalAmount}</p>
// //       </div>

// //       <div className="mb-4">
// //         <h2 className="text-lg font-semibold">Shipping Address</h2>
// //         <textarea
// //           value={shippingAddress}
// //           onChange={(e) => setShippingAddress(e.target.value)}
// //           placeholder="Enter your shipping address"
// //           className="w-full p-2 border border-gray-300 rounded-md"
// //         />
// //       </div>

// //       <div className="mb-4">
// //         <h2 className="text-lg font-semibold">Payment Method</h2>
// //         <select
// //           value={paymentMethod}
// //           onChange={(e) => setPaymentMethod(e.target.value)}
// //           className="w-full p-2 border border-gray-300 rounded-md"
// //         >
// //           <option value="cash">Cash on Delivery</option>
// //           <option value="online">Online Payment</option>
// //         </select>
// //       </div>

// //       <button
// //         onClick={handleOrder}
// //         className="bg-pink-500 text-white w-full py-2 rounded-md"
// //       >
// //         Proceed
// //       </button>
// //     </div>
// //   );
// // };

// // export default Checkout;

// import React, { useState } from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51QlhetJaASwzLigVevWZOCr5lvoZ65pRNfkwOgRoLZ3nlF1TyOxEIEdM9n7IE2YUDNZUdK4BidjmNsdYIgfyvQFR006XbqYVwR");

// const Checkout = () => {
//   const { cartItems, clearCart } = useCart();
//   const [shippingAddress, setShippingAddress] = useState("");
//   const navigate = useNavigate();

//   const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
//   const token = localStorage.getItem("token");

//   let userId = null;
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       userId = decodedToken.id || decodedToken.userId;
//     } catch (error) {
//       alert("Session expired. Please log in again.");
//       navigate("/login");
//     }
//   }

//   const handleStripePayment = async () => {
//     if (!userId) {
//       alert("You must be logged in to place an order.");
//       navigate("/login");
//       return;
//     }

//     const stripe = await stripePromise;

//     const response = await fetch("http://localhost:8080/api/stripe/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cartItems }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       await stripe.redirectToCheckout({ sessionId: data.id });
//     } else {
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="p-8 mt-4">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold">Order Summary</h2>
//         {cartItems.map((item, index) => (
//           <div key={index} className="flex items-center space-x-4 mb-2">
//             <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
//             <div>
//               <h3 className="font-semibold">{item.name}</h3>
//               <p className="text-pink-500">Rs {item.price}</p>
//             </div>
//           </div>
//         ))}
//         <p className="font-bold mt-4">Total: Rs {totalAmount}</p>
//       </div>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold">Shipping Address</h2>
//         <textarea
//           value={shippingAddress}
//           onChange={(e) => setShippingAddress(e.target.value)}
//           placeholder="Enter your shipping address"
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//       </div>

//       <button onClick={handleStripePayment} className="bg-pink-500 text-white w-full py-2 rounded-md">
//         Pay with Card
//       </button>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QlhetJaASwzLigVevWZOCr5lvoZ65pRNfkwOgRoLZ3nlF1TyOxEIEdM9n7IE2YUDNZUdK4BidjmNsdYIgfyvQFR006XbqYVwR");

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // New state for payment method
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      
      
      userId = decodedToken.id || decodedToken.userId;
    } catch (error) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    }
  }

  
  // const handleStripePayment = async () => {
  //   if (!userId) {
  //     alert("You must be logged in to place an order.");
  //     navigate("/login");
  //     return;
  //   }

  //   const stripe = await stripePromise;

  //   const response = await fetch("http://localhost:8080/api/stripe/checkout", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ cartItems }),
  //   });

  //   const data = await response.json();
  //   if (response.ok) {
  //     await stripe.redirectToCheckout({ sessionId: data.id });
  //   } else {
  //     alert("Payment failed");
  //   }
  // };
  const handleStripePayment = async () => {
    // if (!userId) {
    //   alert("You must be logged in to place an order.");
    //   navigate("/login");
    //   return;
    // }
  
    // Step 1: Create an order first
    const orderResponse = await fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          product: item._id, 
          price: item.price,
        })),
        totalAmount,
        shippingAddress,
        paymentMethod: "card",
      }),
    });
  
    const orderData = await orderResponse.json();
    
    if (!orderResponse.ok) {
      alert(orderData.message || "Failed to create order.");
      return;
    }
  
    const orderId = orderData._id; // Get order ID from response
  
    // Step 2: Send orderId with Stripe session request
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:8080/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems, orderId }), // ✅ Include orderId
    });
  
    const data = await response.json();
    
    if (response.ok) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert("Payment failed");
    }
  };
  
  
  const handleSubmitOrder = async () => {
    // if (!userId) {
    //   alert("You must be logged in to place an order.");
    //   navigate("/login");
    //   return;
    // }
  
    if (paymentMethod === "card") {
      handleStripePayment();
    } else {
      // Handle Cash on Delivery
      try {
        const response = await fetch("http://localhost:8080/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              product: item._id, 
              price: item.price,
            })),
            totalAmount,
            shippingAddress,
            paymentMethod,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Order placed successfully! You'll pay upon delivery.");
          clearCart();
          navigate("/ordersuccess");
        } else {
          alert(data.message || "Failed to place order");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order.");
      }
    }
  };

  return (
    <div className="p-8 mt-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-pink-500">Rs {item.price}</p>
            </div>
          </div>
        ))}
        <p className="font-bold mt-4">Total: Rs {totalAmount}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Cash on Delivery
        </label>
        <label className="ml-4">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Pay with Card
        </label>
      </div>

      <button onClick={handleSubmitOrder} className="bg-pink-500 text-white w-full py-2 rounded-md">
        {paymentMethod === "cash" ? "Place Order" : "Pay with Card"}
      </button>
    </div>
  );
};

export default Checkout;





