import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ================= ROLE =================
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ================= SUBSCRIPTION =================
    isSubscribed: {
      type: Boolean,
      default: false,
    },

    subscriptionType: {
      type: String,
      enum: ["monthly", "yearly", null],
      default: null,
    },

    subscriptionExpiry: {
      type: Date,
      default: null,
    },

    // ================= CHARITY =================
    charity: {
      name: {
        type: String,
        default: null,
      },
      percentage: {
        type: Number,
        default: 10,
        min: 10,
        max: 100,
      },
    },

    // ================= SCORES =================
    scores: [
      {
        value: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],

    // ================= WINNINGS =================
    winnings: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ================= DRAW STATS =================
    drawsEntered: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;