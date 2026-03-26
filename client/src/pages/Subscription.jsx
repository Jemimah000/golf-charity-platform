import React from "react";
import axios from "axios";

const API = "https://golf-charity-platform-5wiu.onrender.com";

const Subscription = () => {

  const subscribe = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${API}/api/auth/subscribe`,
        { type: "monthly" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Subscribed successfully ✅");

    } catch (err) {
      console.log("Subscription Error:", err.response?.data || err.message);
      alert("Subscription failed ❌");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl mb-4">Subscription</h1>

      <button
        onClick={subscribe}
        className="bg-[#2DD4BF] text-black px-6 py-2 rounded"
      >
        Subscribe Monthly
      </button>
    </div>
  );
};

export default Subscription;