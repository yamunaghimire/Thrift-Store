// import express from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/checkout", async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: cartItems.map((item) => ({
//         price_data: {
//           currency: "usd",
//           product_data: { name: item.name },
//           unit_amount: item.price * 100,
//         },
//         quantity: 1,
//       })),
//       success_url: `${process.env.CLIENT_URL}/ordersuccess`,
//       cancel_url: `${process.env.CLIENT_URL}/checkout`,
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe Checkout Error:", error);
//     res.status(500).json({ message: "Stripe Checkout failed", error });
//   }
// });

// export default router;



import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    console.log("Received cart items:", cartItems); 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "npr",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      success_url: `${process.env.CLIENT_URL}/ordersuccess`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Stripe Checkout failed", error });
  }
});

export default router;


