import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    image: {
      type: String, // URL or path to the product image
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
