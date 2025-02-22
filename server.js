import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import UserModel from "./models/UserModel.js";
import CategoryModel from "./models/CategoryModel.js"; 
import Product from "./models/productModel.js"; 
import Order from "./models/OrderModel.js";
import orderRoutes from "./routes/OrderRoutes.js";
import { authenticateToken } from "./middlewares/authMiddleware.js"; 
import adminProductRoutes from "./routes/adminProductRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from "body-parser";
import stripeRoutes from "./routes/StripeRoute.js";

dotenv.config();
connectDB();

const app = express();
// Stripe Webhook Middleware 
app.post('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials:true,
}));
app.use(bodyParser.json()); 

// User Registration Route
app.post("/register", async (req, res) => {
  const { fullname, email, phone, password, role = "user" } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "An error occurred during registration", error: err });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "An error occurred during login", error: err });
  }
});
app.get('/getUsers', async (req, res) => {
  try {
    const users = await UserModel.find(); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Category addition route
app.post("/categories", async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    // Create and save the new category
    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error: error.message });
  }
});

// Fetch all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.find(); // Retrieve all categories from the database
    res.status(200).json(categories); // Send categories as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});

// Routes
app.use("/api/products", productRoutes);

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});
app.use("/api", orderRoutes); 
// app.use("/api/orders", authenticateToken, orderRoutes); // Order routes

app.use("/api/admin/products", adminProductRoutes);

app.use("/api/stripe", stripeRoutes);










// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
