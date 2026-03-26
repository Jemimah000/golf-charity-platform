import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  // ================= FETCH SCORES =================
  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scores", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setScores(res.data);
    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    }
  };


  // ================= ADD SCORE =================
const handleAddScore = async () => {
  try {
    if (!newScore) {
      return alert("Enter a score");
    }

    // ✅ VALIDATION 
    if (newScore < 1 || newScore > 45) {
      return alert("Score must be between 1 and 45");
    }

    await axios.post(
      "http://localhost:5000/api/scores/add",
      { value: Number(newScore) }, // ✅ IMPORTANT FIX (value NOT score)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNewScore("");
    fetchScores();

  } catch (err) {
    console.log("Add Score Error:", err.response?.data || err.message);
    alert("Error adding score ❌");
  }
};

  // ================= RUN DRAW =================
  const runDraw = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/draw/run",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = res.data;

    const user = JSON.parse(localStorage.getItem("user"));

    const myResult = data.winners.find(
      (w) => w.userId === user.id
    );

    setResult({
      winningNumbers: data.winningNumbers,
      matchCount: myResult ? myResult.matchCount : 0,
    });

  } catch (err) {
    alert("Draw failed ❌");
  }
};

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2 text-[#2DD4BF] text-xl font-bold">
          <Sparkles />
          LuckyDraw Dashboard
        </div>

        <button
          onClick={runDraw}
          className="bg-[#2DD4BF] text-[#020617] px-5 py-2 rounded-lg font-bold hover:scale-105 transition"
        >
          Run Draw 🎲
        </button>
      </div>

      {result && (
  <div className="mb-10 text-center">
    <div className="bg-[#0b1224] p-6 rounded-xl inline-block">

      <p className="mb-2">
        Winning Numbers: {result.winningNumbers.join(", ")}
      </p>

      <p className="mb-2">
        Your Matches: {result.matchCount}
      </p>

      {result.matchCount >= 3 ? (
        <div className="bg-green-500 text-black px-4 py-2 rounded">
          🎉 You Won!
        </div>
      ) : (
        <div className="bg-red-500 text-black px-4 py-2 rounded">
          😢 Better Luck Next Time
        </div>
      )}
    </div>
  </div>
)}

      {/* ADD SCORE */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl mb-10 border border-slate-800">
        <h2 className="text-xl font-bold mb-4">Add New Score</h2>

        <div className="flex gap-4">
          <input
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            className="flex-1 bg-[#020617] border border-slate-700 p-3 rounded-lg outline-none"
          />

          <button
            onClick={handleAddScore}
            className="bg-[#2DD4BF] text-[#020617] px-6 rounded-lg font-bold flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </div>
      </div>

      {/* SCORES */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold mb-6">Your Scores</h2>

        {scores.length === 0 ? (
          <p className="text-slate-400">No scores yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {scores.map((score, i) => (
              <div key={i} className="p-4 bg-[#020617] rounded-xl">
                <div className="text-[#2DD4BF] font-bold">
                  {score.value}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(score.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;