import express from "express";
import Charity from "../models/Charity.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= GET ALL CHARITIES =================
router.get("/", async (req, res) => {
  const charities = await Charity.find();
  res.json(charities);
});

// ================= GET FEATURED CHARITIES =================
router.get("/featured", async (req, res) => {
  const featured = await Charity.find({ isFeatured: true, isActive: true });
  res.json(featured);
});

// ================= SELECT CHARITY =================
router.post("/select", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { charityId, percentage } = req.body;

    const charity = await Charity.findById(charityId);
    if (!charity) return res.status(404).json({ message: "Charity not found ❌" });

    user.charity = { name: charity.name, percentage };
    await user.save();

    res.json({ message: `Charity "${charity.name}" saved with ${percentage}% donation ❤️` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error selecting charity ❌" });
  }
});

// ================= CALCULATE CONTRIBUTION =================
router.get("/contribution", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.charity?.name || !user.isSubscribed) return res.json({ message: "No charity selected or subscription inactive", contribution: 0 });

    const fee = user.subscriptionType === "yearly" ? 1000 : 100;
    const contribution = (fee * user.charity.percentage) / 100;

    res.json({ charity: user.charity.name, percentage: user.charity.percentage, contribution });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= ADMIN CRUD CHARITIES =================

// Add Charity
router.post("/add", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });
  const newCharity = await Charity.create(req.body);
  res.json({ message: "Charity added ✅", charity: newCharity });
});

// Update Charity
router.put("/update/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });
  const charity = await Charity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!charity) return res.status(404).json({ message: "Charity not found ❌" });
  res.json({ message: "Charity updated ✅", charity });
});

// Delete Charity
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied ❌" });
  const charity = await Charity.findByIdAndDelete(req.params.id);
  if (!charity) return res.status(404).json({ message: "Charity not found ❌" });
  res.json({ message: "Charity deleted ✅" });
});

export default router;