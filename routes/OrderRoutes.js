// // // // // // // //OrderRoutes 
// // // // // // // import express from "express";
// // // // // // // import Order from "../models/OrderModel.js"; // Import Order model
// // // // // // // import { authenticateToken } from "../middlewares/authMiddleware.js"; // Import auth middleware

// // // // // // // const router = express.Router();

// // // // // // // // // Create a new order
// // // // // // // // router.post("/order", authenticateToken, async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

// // // // // // // //     // Validate the required fields
// // // // // // // //     if (!items || !shippingAddress || !paymentMethod || !totalAmount) {
// // // // // // // //       return res.status(400).json({ message: "Missing required fields" });
// // // // // // // //     }

// // // // // // // //     // Create a new order
// // // // // // // //     const newOrder = new Order({
// // // // // // // //       user: req.user.id, // Use the user ID from the decoded token
// // // // // // // //       items,
// // // // // // // //       shippingAddress,
// // // // // // // //       paymentMethod,
// // // // // // // //       totalAmount,
// // // // // // // //       status: "pending", // Default order status
// // // // // // // //     });

// // // // // // // //     // Save the order to the database
// // // // // // // //     const savedOrder = await newOrder.save();

// // // // // // // //     // Respond with the saved order
// // // // // // // //     res.status(201).json(savedOrder);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error creating order:", error);
// // // // // // // //     res.status(500).json({ message: "Failed to create order" });
// // // // // // // //   }
// // // // // // // // });
// // // // // // // router.post("/order", authenticateToken, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

// // // // // // //     // Validate the required fields
// // // // // // //     if (!items || !shippingAddress || !paymentMethod || !totalAmount) {
// // // // // // //       return res.status(400).json({ message: "Missing required fields" });
// // // // // // //     }

// // // // // // //     // Create a new order
// // // // // // //     const newOrder = new Order({
// // // // // // //       user: req.user.id, // Use the user ID from the decoded token
// // // // // // //       items,
// // // // // // //       shippingAddress,
// // // // // // //       paymentMethod,
// // // // // // //       totalAmount,
// // // // // // //       status: "pending", // Default order status
// // // // // // //     });

// // // // // // //     // Save the order to the database
// // // // // // //     const savedOrder = await newOrder.save();

// // // // // // //     // Mark products as sold
// // // // // // //     const productIds = items.map((item) => item.product); // Extract product IDs from the items
// // // // // // //     await Product.updateMany(
// // // // // // //       { _id: { $in: productIds } }, // Find all products in the order
// // // // // // //       { $set: { sold: true } } // Mark them as sold
// // // // // // //     );

// // // // // // //     // Respond with the saved order
// // // // // // //     res.status(201).json(savedOrder);
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error creating order:", error);
// // // // // // //     res.status(500).json({ message: "Failed to create order" });
// // // // // // //   }
// // // // // // // });


// // // // // // // // Get all orders for the logged-in user
// // // // // // // router.get("/orders", authenticateToken, async (req, res) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user.id; // Use the user ID from the decoded token

// // // // // // //     // Fetch all orders for the user
// // // // // // //     const orders = await Order.find({ user: userId });

// // // // // // //     if (!orders.length) {
// // // // // // //       return res.status(404).json({ message: "No orders found" });
// // // // // // //     }

// // // // // // //     res.status(200).json(orders);
// // // // // // //   } catch (error) {
// // // // // // //     console.error("Error fetching orders:", error);
// // // // // // //     res.status(500).json({ message: "Failed to fetch orders" });
// // // // // // //   }
// // // // // // // });

// // // // // // // export default router;


// // orderRoutes.js yo chaincha (Route handling order creation)
// import express from "express";
// import Order from "../models/OrderModel.js";
// import Product from "../models/productModel.js";
// import { authenticateToken } from "../middlewares/authMiddleware.js";
// import Stripe from "stripe";

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/order", authenticateToken, async (req, res) => {
//   try {
//     const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

//     // Validate required fields
//     if (!items || !shippingAddress || !paymentMethod || !totalAmount) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Create the new order
//     const newOrder = new Order({
//       user: req.user.id,
//       items,
//       shippingAddress,
//       paymentMethod,
//       totalAmount,
//       status: "pending",
//       paymentStatus: "pending",
//     });

//     const savedOrder = await newOrder.save();

//     // Extract product IDs from the order items
//     const productIds = items.map((item) => item.product);

//     // If the payment method is cash (COD), immediately mark products as sold
//     if (paymentMethod === "cash") {
//       await Product.updateMany(
//         { _id: { $in: productIds } },
//         { $set: { sold: true } }
//       );
//       return res.status(201).json({ orderId: savedOrder._id, message: "Order placed successfully (Cash on Delivery)." });
//     }

//     // If the payment method is via Stripe (card), process the payment
//     if (paymentMethod === "card") {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: totalAmount * 100, // Convert to cents
//         currency: "usd",
//         payment_method: req.body.paymentMethodId,
//         confirmation_method: "manual",
//         confirm: true,
//       });

//       // If payment is successful, mark products as sold and update order status
//       if (paymentIntent.status === "succeeded") {
//         await Product.updateMany(
//           { _id: { $in: productIds } },
//           { $set: { sold: true } }
//         );
//         savedOrder.paymentStatus = "completed";
//         savedOrder.status = "completed";
//         await savedOrder.save();

//         return res.status(201).json({ orderId: savedOrder._id, message: "Payment successful, order completed!" });
//       } else {
//         savedOrder.paymentStatus = "failed";
//         await savedOrder.save();
//         return res.status(400).json({ message: "Payment failed, order not completed." });
//       }
//     }

//     return res.status(400).json({ message: "Invalid payment method." });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Failed to create order", error });
//   }
// });
// router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event when the payment is succeeded
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     // Update the order with payment status and mark products as sold
//     const order = await Order.findById(session.client_reference_id);
//     if (order) {
//       order.paymentStatus = "completed";
//       order.status = "completed";

//       // Mark products as sold
//       const productIds = order.items.map(item => item.product);
//       await Product.updateMany(
//         { _id: { $in: productIds } },
//         { $set: { sold: true } }
//       );

//       await order.save();
//       console.log("Order and products updated successfully.");
//     }
//   }

//   res.status(200).send("Success");
// });

// export default router;


import express from "express";
import Order from "../models/OrderModel.js";
import Product from "../models/productModel.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new order
router.post("/order", authenticateToken, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || !shippingAddress || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = new Order({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "initiated", 
      paymentStatus: "pending",
    });

    const savedOrder = await newOrder.save();
    const productIds = items.map((item) => item.product);

    // Cash on Delivery
    if (paymentMethod === "cash") {
      await Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { sold: true } }
      );
      savedOrder.paymentStatus = "pending";
      savedOrder.status = "processing"; 
      await savedOrder.save();
      return res.status(201).json({ orderId: savedOrder._id, message: "Order placed successfully (Cash on Delivery)." });
    }

    // Stripe Payment
    if (paymentMethod === "card") {
      savedOrder.status = "processing"; 
      await savedOrder.save();

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, 
        currency: "usd",
        metadata: {
          orderId: savedOrder._id.toString(),
        },
      });

      return res.status(201).json({ clientSecret: paymentIntent.client_secret });
    }

    return res.status(400).json({ message: "Invalid payment method." });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
});

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId; 

    if (!orderId) {
      console.error("Missing orderId in metadata");
      return res.status(400).send("Missing orderId");
    }

    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = "completed";
        order.status = "completed";

        // Mark products as sold
        const productIds = order.items.map((item) => item.product);
        await Product.updateMany(
          { _id: { $in: productIds } },
          { $set: { sold: true } } 
        );

        await order.save();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).send("Error updating order");
    }
  }

  res.status(200).send("Success");
});


export default router;
