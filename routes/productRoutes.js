import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
import { authenticateToken, adminOnly } from "../middlewares/authMiddleware.js";
import fs from "fs/promises";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Route: Admin Upload Product
router.post(
  "/upload",
  authenticateToken,
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, category } = req.body;

      if (!name || !description || !price || !category) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ message: "Price must be a valid number." });
      }

      const product = await Product.create({
        name,
        description,
        price: parsedPrice,
        category,
        image: req.file.path, // Multer handles the image path from Cloudinary
      });

      res.status(201).json({ message: "Product uploaded successfully", product });
    } catch (error) {
      console.error("Error uploading product:", error);
      res.status(500).json({ message: "Error uploading product", error });
    }
  }
);

// Additional Routes for Products...
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

export default router;
