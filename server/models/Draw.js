import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    // 📅 Draw date
    drawDate: {
      type: Date,
      default: Date.now,
    },

    // 🎯 Winning numbers
    winningNumbers: {
      type: [Number],
      required: true,
    },

    // 🏆 Winners
    winners: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        matchCount: Number,

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

    // 💰 Prize pool
    totalPool: {
      type: Number,
      default: 0,
    },

    jackpot: {
      type: Number,
      default: 0,
    },

    // ⚙️ Type
    drawType: {
      type: String,
      enum: ["random", "algorithm"],
      default: "random",
    },

    // 📢 Published or not
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Draw", drawSchema);