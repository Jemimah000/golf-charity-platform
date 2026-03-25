import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    // 🔴 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // 🔐 generate token (IMPORTANT)
    const token = jwt.sign(
    { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "Signup successful 🎉",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 🔐 compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // 🔐 generate token (WITH ROLE 🔥)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful 🔥",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= GET ALL USERS (ADMIN) =================
router.get("/users", authMiddleware, async (req, res) => {
  try {
    // 🔴 only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied ❌" });
    }

    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;