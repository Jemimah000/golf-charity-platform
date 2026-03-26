import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://golf-charity-platform-5wiu.onrender.com";

const Subscription = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch user subscription info
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Handle subscription
  const subscribe = async (type) => {
    if (!token) {
      alert("You must be logged in to subscribe!");
      return;
    }

    setSubscribing(true);
    try {
      const res = await axios.post(
        `${API}/api/auth/subscribe`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Subscribed successfully 🎉");
      fetchUser(); // refresh subscription info
    } catch (err) {
      console.error("Subscription Error:", err.response?.data || err.message);
      alert("Subscription failed ❌");
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading subscription info...
      </div>
    );
  }

  const isActive = user?.isSubscribed;
  const expiryDate = user?.subscriptionExpiry
    ? new Date(user.subscriptionExpiry).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-4">🎟️ Subscription</h1>
      <p className="text-gray-400 mb-6 text-center max-w-md">
        Subscribe to participate in lucky draws, support charities, and unlock full
        platform access ❤️
      </p>

      {/* ✅ Subscription Status */}
      <div className="mb-6 p-4 border border-gray-700 rounded-xl w-full max-w-md text-center">
        <p>
          <strong>Status:</strong>{" "}
          <span className={isActive ? "text-green-400" : "text-red-400"}>
            {isActive ? "Active ✅" : "Inactive ❌"}
          </span>
        </p>
        {isActive && (
          <p>
            <strong>Renewal Date:</strong> {expiryDate}
          </p>
        )}
      </div>

      {/* ✅ Subscription Options */}
      {!isActive && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => subscribe("monthly")}
            disabled={subscribing}
            className="bg-[#2DD4BF] hover:scale-105 text-black px-8 py-3 rounded-xl font-bold transition"
          >
            Subscribe Monthly
          </button>
          <button
            onClick={() => subscribe("yearly")}
            disabled={subscribing}
            className="bg-[#06B6D4] hover:scale-105 text-black px-8 py-3 rounded-xl font-bold transition"
          >
            Subscribe Yearly (Save 20%)
          </button>
        </div>
      )}

      {isActive && (
        <p className="text-gray-400 text-center max-w-md">
          You're already subscribed! Enjoy full access to draws and platform features ✨
        </p>
      )}
    </div>
  );
};

export default Subscription;