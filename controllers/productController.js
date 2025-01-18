import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// Create a new product with image upload
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const image = req.file ? req.file.path : null; // Get the image path from multer

  try {
    // Check if the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({ name, description, price, category, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Populate category data
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by name
export const getProduct = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update a product by name
export const updateProduct = async (req, res) => {
  const { name } = req.params;
  const { newName, description, price, category, stock, image } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { name },
      { name: newName, description, price, category, stock, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product by name
export const deleteProduct = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ name });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
