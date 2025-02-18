// // //productRoutes.js
// // import express from "express";
// // import multer from "multer";
// // import { v2 as cloudinary } from "cloudinary";
// // import Product from "../models/productModel.js";
// // import { authenticateToken, adminOnly } from "../middlewares/authMiddleware.js";
// // import fs from "fs/promises";
// // import { CloudinaryStorage } from "multer-storage-cloudinary";

// // const router = express.Router();

// // // Configure Cloudinary
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // Configure Multer to use Cloudinary
// // const storage = new CloudinaryStorage({
// //   cloudinary,
// //   params: {
// //     folder: "products",
// //     allowed_formats: ["jpg", "jpeg", "png"],
// //   },
// // });
// // const upload = multer({ storage });

// // // Route: Admin Upload Product
// // router.post(
// //   "/upload",
// //   authenticateToken,
// //   adminOnly,
// //   upload.single("image"),
// //   async (req, res) => {
// //     try {
// //       const { name, description, price, category } = req.body;

// //       if (!name || !description || !price || !category) {
// //         return res.status(400).json({ message: "All fields are required." });
// //       }

// //       const parsedPrice = parseFloat(price);
// //       if (isNaN(parsedPrice)) {
// //         return res.status(400).json({ message: "Price must be a valid number." });
// //       }

// //       const product = await Product.create({
// //         name,
// //         description,
// //         price: parsedPrice,
// //         category,
// //         image: req.file.path, // Multer handles the image path from Cloudinary
// //       });

// //       res.status(201).json({ message: "Product uploaded successfully", product });
// //     } catch (error) {
// //       console.error("Error uploading product:", error);
// //       res.status(500).json({ message: "Error uploading product", error });
// //     }
// //   }
// // );


// // // router.get("/", async (req, res) => {
// // //   try {
// // //     const products = await Product.find();
// // //     res.json(products);
// // //   } catch (error) {
// // //     res.status(500).json({ message: "Error fetching products", error });
// // //   }
// // // });
// // router.get("/", async (req, res) => {
// //   const { category } = req.query;
// //   try {
// //     const query = category ? { category } : {};
// //     const products = await Product.find(query).populate("category");
// //     res.json(products);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching products", error });
// //   }
// // });


// // export default router;
// import express from "express";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/productModel.js";
// import CategoryModel from "../models/CategoryModel.js";  // Ensure this is imported
// import { authenticateToken, adminOnly } from "../middlewares/authMiddleware.js";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const router = express.Router();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer to use Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "products",
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });
// const upload = multer({ storage });

// // Route: Admin Upload Product
// router.post(
//   "/upload",
//   authenticateToken,
//   adminOnly,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const { name, description, price, category } = req.body;

//       if (!name || !description || !price || !category) {
//         return res.status(400).json({ message: "All fields are required." });
//       }

//       // Validate category existence
//       const categoryExists = await CategoryModel.findById(category);
//       if (!categoryExists) {
//         return res.status(400).json({ message: "Invalid category ID" });
//       }

//       const parsedPrice = parseFloat(price);
//       if (isNaN(parsedPrice)) {
//         return res.status(400).json({ message: "Price must be a valid number." });
//       }

//       const product = await Product.create({
//         name,
//         description,
//         price: parsedPrice,
//         category, // The category is already an ID, it's being passed directly.
//         image: req.file.path, // Multer handles the image path from Cloudinary
//       });

//       res.status(201).json({ message: "Product uploaded successfully", product });
//     } catch (error) {
//       console.error("Error uploading product:", error);
//       res.status(500).json({ message: "Error uploading product", error });
//     }
//   }
// );

// // Route: Fetch Products by Category
// router.get("/", async (req, res) => {
//   const { category } = req.query;
//   try {
//     const query = category ? { category } : {};
//     const products = await Product.find(query).populate("category");
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// // Optional Route: Fetch Products by Category ID (for specific category view)
// router.get("/category/:categoryId", async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const products = await Product.find({ category: categoryId }).populate("category");
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products for category", error });
//   }
// });

// export default router;

import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js"; // Import the Category model
import { authenticateToken, adminOnly } from "../middlewares/authMiddleware.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to sanitize category name
const sanitizeCategoryName = (category) => {
  return category.replace(/\s+/g, '_').toLowerCase(); // Replace spaces with underscores and lowercase the name
};

// Configure Multer to use Cloudinary with dynamic folder based on category
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: `products/${sanitizeCategoryName(req.body.category)}`,  // Apply sanitization
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
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

      // Check if all required fields are provided
      if (!name || !description || !price || !category) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Validate price
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ message: "Price must be a valid number." });
      }

      // Create the new product
      const product = await Product.create({
        name,
        description,
        price: parsedPrice,
        category,
        image: req.file.path, // Image URL from Cloudinary storage
      });

      res.status(201).json({ message: "Product uploaded successfully", product });
    } catch (error) {
      console.error("Error uploading product:", error);
      res.status(500).json({ message: "Error uploading product", error });
    }
  }
);

// Route: Fetch Products by Category (case-insensitive)
router.get("/", async (req, res) => {
  const { category } = req.query;

  console.log("Received category:", category);

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // Find the category ObjectId based on the string category name (case-insensitive)
    const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, "i") } });

    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Query products by the ObjectId of the category
    const products = await Product.find({ category: categoryDoc._id });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Optional Route: Fetch Products by Category ID (for specific category view)
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products for category", error });
  }
});

export default router;
