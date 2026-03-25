import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Charity from "../models/Charity.js";
import User from "../models/User.js";

const router = express.Router();

// ================= GET ALL CHARITIES =================
// GET /api/charity
router.get("/", async (req, res) => {
  try {
    const charities = await Charity.find();
    res.json(charities);
  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ================= ADD CHARITY (ADMIN ONLY) =================
// POST /api/charity/add
router.post("/add", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied ❌" });
    }

    const { name, description } = req.body;

    const charity = await Charity.create({
      name,
      description,
    });

    res.json({
      message: "Charity added successfully ✅",
      charity,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ================= SELECT CHARITY =================
// POST /api/charity/select
router.post("/select", authMiddleware, async (req, res) => {
  try {
    const { charityId, percentage } = req.body;

    if (percentage < 10) {
      return res.status(400).json({
        message: "Minimum contribution is 10% ❌",
      });
    }

    const charity = await Charity.findById(charityId);

    if (!charity) {
      return res.status(404).json({ message: "Charity not found ❌" });
    }

    const user = await User.findById(req.user.id);

    user.charity = charity.name;
    user.charityPercentage = percentage;

    await user.save();

    res.json({
      message: "Charity selected successfully ❤️",
      charity: user.charity,
      percentage: user.charityPercentage,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

export default router;