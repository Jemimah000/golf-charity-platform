import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Draw from "../models/Draw.js";

const router = express.Router();

// ================= RUN DRAW (ADMIN ONLY) =================
router.post("/run", authMiddleware, async (req, res) => {
  try {
    // 🔒 Only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can run draw ❌" });
    }

    const users = await User.find();

    if (!users.length) {
      return res.status(400).json({ message: "No users found ❌" });
    }

    // 🎲 UNIQUE random numbers (1–45)
    const winningNumbers = [];
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(num)) {
        winningNumbers.push(num);
      }
    }

    let winners = [];
    let totalPool = users.length * 50; // 💰 example pool logic

    // 🔍 CHECK EACH USER
    for (let user of users) {
      const userScores = user.scores.map((s) => s.value);

      const matchCount = userScores.filter((num) =>
        winningNumbers.includes(num)
      ).length;

      let prize = 0;

      if (matchCount === 5) prize = 1000;
      else if (matchCount === 4) prize = 500;
      else if (matchCount === 3) prize = 200;

      if (prize > 0) {
        // 💰 Update user winnings
        user.winnings += prize;
        await user.save();

        winners.push({
          user: user._id,
          matchCount,
          prize,
          status: "pending",
        });
      }
    }

    // 💾 SAVE DRAW
    const draw = await Draw.create({
      winningNumbers,
      winners,
      totalPool,
      jackpot: 1000,
      isPublished: true,
    });

    res.json({
      message: "Official Draw Completed 🎉",
      drawId: draw._id,
      winningNumbers,
      winners,
    });

  } catch (error) {
    console.log("DRAW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================= GET ALL DRAWS =================
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const draws = await Draw.find()
      .populate("winners.user", "email")
      .sort({ createdAt: -1 });

    res.json(draws);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= UPDATE WINNER STATUS =================
// (pending → verified → paid)
router.put("/winner/:drawId/:winnerId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied ❌" });
    }

    const { status } = req.body;

    const draw = await Draw.findById(req.params.drawId);

    const winner = draw.winners.id(req.params.winnerId);

    if (!winner) {
      return res.status(404).json({ message: "Winner not found ❌" });
    }

    winner.status = status;

    await draw.save();

    res.json({ message: "Winner updated ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;