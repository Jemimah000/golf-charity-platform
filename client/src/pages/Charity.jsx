import React, { useState } from "react";
import axios from "axios";
import CharityList from "../components/CharityList";

const API_BASE = "https://golf-charity-platform-5wiu.onrender.com";

const Charity = () => {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [percent, setPercent] = useState(10);
  const [loading, setLoading] = useState(false);

  const saveSelection = async () => {
    if (!selectedCharity) {
      alert("Please select a charity ❤️");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      await axios.post(
        `${API_BASE}/api/charity/select`,
        {
          charityId: selectedCharity._id,
          percentage: percent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Charity "${selectedCharity.name}" saved with ${percent}% donation ❤️`);
    } catch (err) {
      console.log("Charity Save Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error saving charity ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-6 text-[#2DD4BF]">
        Give Back ❤️
      </h1>

      <CharityList onSelect={setSelectedCharity} selectedCharity={selectedCharity} />

      <div className="mt-6">
        <p className="mb-2">Donation Percentage: <span className="text-[#2DD4BF]">{percent}%</span></p>
        <input
          type="range"
          min="10"
          max="50"
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          className="w-full accent-[#2DD4BF]"
        />
      </div>

      {selectedCharity && (
        <p className="mt-4 text-[#2DD4BF] font-semibold">
          Selected Charity: {selectedCharity.name}
        </p>
      )}

      <button
        onClick={saveSelection}
        disabled={loading}
        className={`mt-6 px-6 py-2 rounded-lg font-bold transition 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#2DD4BF] text-black hover:scale-105"}`}
      >
        {loading ? "Saving..." : "Save Charity"}
      </button>

    </div>
  );
};

export default Charity;