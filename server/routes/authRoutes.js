import express from "express";
import User from "../models/User.js";
import Charity from "../models/Charity.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists ❌" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Signup successful 🎉",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials ❌" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= GET PROFILE =================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ================= ADMIN: GET USERS =================
router.get("/users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });

    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= SUBSCRIBE =================
router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { type } = req.body;

    if (!["monthly", "yearly"].includes(type)) return res.status(400).json({ message: "Invalid subscription type ❌" });

    user.isSubscribed = true;
    user.subscriptionType = type;
    user.subscriptionExpiry = new Date(Date.now() + (type === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000);

    await user.save();

    res.json({
      message: "Subscribed successfully 🎉",
      subscriptionType: user.subscriptionType,
      subscriptionExpiry: user.subscriptionExpiry,
    });
  } catch (err) {
    console.log("SUBSCRIBE ERROR:", err);
    res.status(500).json({ message: "Subscription failed ❌" });
  }
});

// ================= USER: SELECT CHARITY =================
router.post("/charity/select", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { charityId, percentage } = req.body;

    const charity = await Charity.findById(charityId);
    if (!charity) return res.status(404).json({ message: "Charity not found ❌" });

    user.charity = { name: charity.name, percentage };
    await user.save();

    res.json({ message: `Charity "${charity.name}" saved with ${percentage}% donation ❤️` });
  } catch (err) {
    console.log("CHARITY SELECT ERROR:", err);
    res.status(500).json({ message: "Error selecting charity ❌" });
  }
});

// ================= USER: CALCULATE CONTRIBUTION =================
router.get("/charity/contribution", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.charity?.name || !user.isSubscribed) {
      return res.json({ message: "No charity selected or subscription inactive", contribution: 0 });
    }

    const fee = user.subscriptionType === "yearly" ? 1000 : 100;
    const contribution = (fee * user.charity.percentage) / 100;

    res.json({ charity: user.charity.name, percentage: user.charity.percentage, contribution });
  } catch (err) {
    console.log("CONTRIBUTION ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= ADMIN: CRUD CHARITIES =================

// Add Charity
router.post("/charity/add", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });

    const newCharity = await Charity.create(req.body);
    res.json({ message: "Charity added ✅", charity: newCharity });
  } catch (err) {
    console.log("ADD CHARITY ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// Update Charity
router.put("/charity/update/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });

    const { name, description, image, events, isFeatured, isActive } = req.body;

    const charity = await Charity.findByIdAndUpdate(
      req.params.id,
      { name, description, image, events, isFeatured, isActive },
      { new: true }
    );

    if (!charity) return res.status(404).json({ message: "Charity not found ❌" });

    res.json({ message: "Charity updated ✅", charity });
  } catch (err) {
    console.log("UPDATE CHARITY ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// Delete Charity
router.delete("/charity/delete/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });

    const charity = await Charity.findByIdAndDelete(req.params.id);
    if (!charity) return res.status(404).json({ message: "Charity not found ❌" });

    res.json({ message: "Charity deleted ✅" });
  } catch (err) {
    console.log("DELETE CHARITY ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

export default router;