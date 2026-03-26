import React, { useState } from "react";
import axios from "axios";
import NumberGrid from "../features/draw/NumberGrid";

const Draw = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    console.log("🔥 BUTTON CLICKED");

    if (selectedNumbers.length !== 5) {
      alert("Select exactly 5 numbers");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/draw/run",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ RESPONSE:", res.data);

      const winningNumbers = res.data.winningNumbers;

      const matches = selectedNumbers.filter((num) =>
        winningNumbers.includes(num)
      );

      setResult({
        winningNumbers,
        matches,
      });

    } catch (err) {
      console.log("❌ DRAW ERROR:", err.response?.data || err.message);
      alert("Draw failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Lucky Draw 🎲
      </h1>

      <NumberGrid
        selectedNumbers={selectedNumbers}
        setSelectedNumbers={setSelectedNumbers}
      />

      <button
        onClick={runDraw}
        className="mt-6 bg-[#2DD4BF] text-black px-6 py-2 rounded-lg font-bold"
      >
        Play Draw
      </button>

      {result && (
        <div className="mt-6">
          <p>Winning Numbers: {result.winningNumbers.join(", ")}</p>
          <p>Your Matches: {result.matches.length}</p>

          {result.matches.length >= 3 ? (
            <div className="bg-green-500 text-black px-4 py-2 mt-2 rounded">
              🎉 You Won!
            </div>
          ) : (
            <div className="bg-red-500 text-black px-4 py-2 mt-2 rounded">
              😢 Better Luck Next Time
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Draw;