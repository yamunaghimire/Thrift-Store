import express from "express";
import Category from "../models/CategoryModel.js";

const app = express();

// Middleware
app.use(express.json());

// POST route to add category
app.post("/categories", async (req, res) => {
  const { name } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error adding category" });
  }
});

export default app;  
