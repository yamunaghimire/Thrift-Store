import express from "express";
import Product from "../models/productModel.js";
import { authenticateToken, adminOnly } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Route: Get All Products (Admin Only)
router.get("/all", authenticateToken, adminOnly, async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Route: Update Product Price (Admin Only)
router.put("/:id", authenticateToken, adminOnly, async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product price
    product.price = price;
    await product.save();

    res.json({ message: "Product price updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product price", error });
  }
});

// Route: Delete Product (Admin Only)
router.delete("/:id", authenticateToken, adminOnly, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default router;
