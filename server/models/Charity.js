import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
  {
    // 🔥 Charity Name
    name: {
      type: String,
      required: true,
    },

    // 🔥 Description
    description: {
      type: String,
      required: true,
    },

    // 🔥 Image (logo/banner)
    image: {
      type: String, // URL
      default: "",
    },

    // 🔥 Events (like golf days)
    events: [
      {
        title: String,
        date: Date,
        location: String,
      },
    ],

    // 🔥 Featured charity (homepage spotlight)
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // 🔥 Total donations received
    totalDonations: {
      type: Number,
      default: 0,
    },

    // 🔥 Active or not
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Charity = mongoose.model("Charity", charitySchema);

export default Charity;