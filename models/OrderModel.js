import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        },
        price: {
          type: Number, 
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, 
    },
    shippingAddress: {
      type: String,
      required: true, 
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"], 
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"], 
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "initiated","completed", "delivered", "cancelled"], 
      default: "pending",
    },
  },
  { timestamps: true } 
);

export default mongoose.model("Order", orderSchema);

