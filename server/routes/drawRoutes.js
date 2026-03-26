import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ================= RUN DRAW =================
router.post("/run", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(400).json({ message: "No users found ❌" });
    }

    // 🎲 generate 5 random numbers (1–45)
    const winningNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 45) + 1
    );

    let winners = [];

    // 🔍 check matches
    for (let user of users) {
      const userScores = user.scores.map((s) => s.value);

      const matchCount = userScores.filter((num) =>
        winningNumbers.includes(num)
      ).length;

      if (matchCount >= 3) {
        // 💰 add winnings
        user.winnings += matchCount * 100;

        await user.save();

        winners.push({
          userId: user._id,
          email: user.email,
          matchCount,
        });
      }
    }

    res.json({
      message: "Draw completed 🎉",
      winningNumbers,
      winners,
    });

  } catch (error) {
    console.log("DRAW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;