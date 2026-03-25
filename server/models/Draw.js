import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    // 🔥 Draw date (monthly)
    drawDate: {
      type: Date,
      default: Date.now,
    },

    // 🔥 Winning numbers (like lottery)
    winningNumbers: {
      type: [Number],
      required: true,
    },

    // 🔥 Winners list
    winners: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        matchCount: {
          type: Number, // 3, 4, or 5 match
        },
        prize: {
          type: Number,
          default: 0,
        },
        status: {
          type: String,
          enum: ["pending", "verified", "paid"],
          default: "pending",
        },
      },
    ],

    // 🔥 Prize pool info
    totalPool: {
      type: Number,
      default: 0,
    },

    jackpot: {
      type: Number,
      default: 0,
    },

    // 🔥 Draw type
    drawType: {
      type: String,
      enum: ["random", "algorithm"],
      default: "random",
    },

    // 🔥 Is published or not
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Draw = mongoose.model("Draw", drawSchema);

export default Draw;