import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

let lastWinnerId = null;

// ================= RUN DRAW =================
router.post("/run", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();

    // ❌ No users
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }

    // 🎲 Pick random user
    const randomIndex = Math.floor(Math.random() * users.length);
    const winner = users[randomIndex];

    // 💾 Store winner
    lastWinnerId = winner._id.toString();

    res.json({
      message: "Draw completed 🎉",
      winner,
    });

  } catch (error) {
    console.log("DRAW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================= GET RESULT =================
router.get("/result", (req, res) => {
  try {
    res.json({
      winnerId: lastWinnerId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;