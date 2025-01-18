// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import bcrypt from 'bcrypt'; 
// // import multer from 'multer';
// // import connectDB from './config/db.js';
// // import UserModel from './models/UserModel.js';
// // import categoryRoutes from "./routes/categoryRoutes.js";
// // import productRoutes from "./routes/productRoutes.js";


// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(express.json());
// // app.use(cors());




// // app.post('/register', async (req, res) => {
// //   const { fullname, email, phone, password } = req.body;

// //   try {
// //     // Hashing of the password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Creating the user with the hashed password
// //     const newUser = await UserModel.create({
// //       fullname,
// //       email,
// //       phone,
// //       password: hashedPassword,
// //     });

// //     console.log('Created User:', newUser);
// //     res.json(newUser);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "An error occurred while registering the user." });
// //   }
// // });

// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await UserModel.findOne({ email });
// //     if (user) {
// //       // Comparing the hashed password
// //       const isMatch = await bcrypt.compare(password, user.password);
// //       if (isMatch) {
// //         res.json('Success');
// //       } else {
// //         res.json('The password is incorrect');
// //       }
// //     } else {
// //       res.json('No record existed');
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "An error occurred during login." });
// //   }
// // });

// // app.get('/getUsers' , (req,res)=>{

// //   UserModel.find()
// //   .then(users => res.json(users))
// //   .catch(err => res.json(err))
// // })

// // // Routes
// // app.use("/api/products", productRoutes);



// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


// // server.js
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import connectDB from "./config/db.js";
// import UserModel from "./models/UserModel.js";
// import CategoryModel from "./models/CategoryModel.js";


// import productRoutes from "./routes/productRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors({
//    origin:["http://localhost:3000"],
//    methods:["GET","POST"],
//    credentials:true
// }));

// // User Registration Route
// app.post("/register", async (req, res) => {
//   const { fullname, email, phone, password, role = "user" } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await UserModel.create({
//       fullname,
//       email,
//       phone,
//       password: hashedPassword,
//       role,
//     });

//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: "An error occurred during registration", error: err });
//   }
// });

// // User Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ message: "An error occurred during login", error: err });
//   }
// });


// // Routes
// // app.use("/api/categories", categoryRoutes);
// app.use("/api/products", productRoutes);




// // Default route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Start the server
// const PORT = process.env.PORT || 5000;// Category addition route
// app.post("/categories", async (req, res) => {
//   const { name } = req.body;

//   try {
//     // Check if the category already exists
//     const existingCategory = await Category.findOne({ name });
//     if (existingCategory) {
//       return res.status(400).json({ message: "Category already exists!" });
//     }

//     // Create and save the new category
//     const newCategory = new Category({ name });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding category", error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import UserModel from "./models/UserModel.js";
import CategoryModel from "./models/CategoryModel.js"; // Corrected import

import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
   origin: ["http://localhost:3000"],
   methods: ["GET", "POST"],
   credentials: true
}));

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

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "An error occurred during login", error: err });
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

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
