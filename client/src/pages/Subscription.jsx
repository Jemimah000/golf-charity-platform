import React from "react";
import axios from "axios";

const Subscription = () => {

  const subscribe = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/subscribe",
        { type: "monthly" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Subscribed successfully 🎉");

      // ✅ optional redirect
      window.location.href = "/dashboard";

    } catch (err) {
      alert("Subscription failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-3xl font-bold mb-4">
        Subscribe & Play 🎟️
      </h1>

      <p className="text-gray-400 mb-6 text-center max-w-md">
        Subscribe to participate in monthly lucky draws and support charities ❤️
      </p>

      <button
        onClick={subscribe}
        className="bg-[#2DD4BF] hover:scale-105 text-black px-8 py-3 rounded-xl font-bold transition"
      >
        Subscribe Now
      </button>

    </div>
  );
};

export default Subscription;