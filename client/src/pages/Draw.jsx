import React, { useState } from "react";
import axios from "axios";
import NumberGrid from "../features/draw/NumberGrid";

const API_BASE = "https://golf-charity-platform-5wiu.onrender.com";

const Draw = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDraw = async () => {
    if (selectedNumbers.length !== 5) {
      alert("Select exactly 5 numbers 🎯");
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/api/draw/run`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const winningNumbers = res.data.winningNumbers;

      const matches = selectedNumbers.filter((num) =>
        winningNumbers.includes(num)
      );

      setResult({
        winningNumbers,
        matches,
      });

    } catch (err) {
      console.log("Draw Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Draw failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-6 text-[#2DD4BF]">
        Lucky Draw 🎲
      </h1>

      {/* Number selection grid */}
      <NumberGrid
        selectedNumbers={selectedNumbers}
        setSelectedNumbers={setSelectedNumbers}
      />

      {/* Play Draw Button */}
      <button
        onClick={runDraw}
        disabled={loading}
        className={`mt-6 px-6 py-2 rounded-lg font-bold transition 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#2DD4BF] text-black hover:scale-105"}`}
      >
        {loading ? "Drawing..." : "Play Draw"}
      </button>

      {/* Draw Result */}
      {result && (
        <div className="mt-6 p-4 bg-[#0b1224]/70 rounded-xl border border-slate-700">
          <p className="mb-2">
            <span className="text-[#2DD4BF] font-semibold">Winning Numbers:</span> {result.winningNumbers.join(", ")}
          </p>
          <p className="mb-2">
            <span className="text-[#2DD4BF] font-semibold">Your Matches:</span> {result.matches.length}
          </p>

          {result.matches.length >= 3 ? (
            <div className="bg-green-500 text-black px-4 py-2 mt-2 rounded font-bold text-center">
              🎉 You Won!
            </div>
          ) : (
            <div className="bg-red-500 text-black px-4 py-2 mt-2 rounded font-bold text-center">
              😢 Better Luck Next Time
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Draw;