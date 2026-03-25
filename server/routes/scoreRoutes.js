import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ================= ADD SCORE =================
// POST /api/scores/add
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { score } = req.body;

    // ✅ Convert to number safely
    const numericScore = Number(score);

    if (!numericScore) {
      return res.status(400).json({ message: "Score is required" });
    }

    if (numericScore < 1 || numericScore > 45) {
      return res.status(400).json({ message: "Score must be between 1 and 45" });
    }

    const user = await User.findById(req.user.id);

    // ❌ CHECK USER EXISTS
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ CHECK scores ARRAY EXISTS
    if (!user.scores) {
      user.scores = [];
    }

    // 🔥 Add new score
    user.scores.push({
      value: numericScore,
      date: new Date(),
    });

    // 🔥 Keep only last 5 scores
    if (user.scores.length > 5) {
      user.scores.shift();
    }

    await user.save();

    res.json({
      message: "Score added successfully ✅",
      scores: user.scores,
    });

  } catch (error) {
    console.log("ADD SCORE ERROR:", error); // 🔥 important for debugging
    res.status(500).json({ message: error.message });
  }
});


// ================= GET SCORES =================
// GET /api/scores
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.scores) {
      return res.json([]);
    }

    const scores = [...user.scores].reverse();

    res.json(scores);

  } catch (error) {
    console.log("GET SCORE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


// ================= DELETE ALL SCORES =================
// DELETE /api/scores
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.scores = [];
    await user.save();

    res.json({ message: "All scores cleared 🗑️" });

  } catch (error) {
    console.log("DELETE SCORE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= GET USER SCORES (ADMIN) =================
// GET /api/scores/admin/:userId
router.get("/admin/:userId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied ❌" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.json(user.scores || []);

  } catch (error) {
    console.log("ADMIN SCORE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;