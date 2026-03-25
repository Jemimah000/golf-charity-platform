import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState("");
  const [isWinner, setIsWinner] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH SCORES =================
  const fetchScores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/scores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setScores(res.data);
    } catch (err) {
      console.log("Fetch Scores Error:", err.response?.data || err.message);
    }
  };

  // ================= CHECK RESULT =================
  const checkResult = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/draw/result");

      const winnerId = res.data.winnerId;

      if (!winnerId) {
        setIsWinner(null);
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.id === winnerId) {
        setIsWinner(true);
      } else {
        setIsWinner(false);
      }

    } catch (err) {
      console.log("Check Result Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchScores();
    checkResult();
  }, []);

  // ================= ADD SCORE =================
  const handleAddScore = async () => {
    try {
      if (!newScore) {
        alert("Enter a score");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/scores/add",
        { score: Number(newScore) },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`🎉 Winner: ${res.data.winner.email}`);

      checkResult();

    } catch (err) {
      console.log("Draw Error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
        "Draw failed ❌ (Check backend)"
      );
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

      {/* RESULT */}
      {isWinner !== null && (
        <div className="mb-10 text-center">
          {isWinner ? (
            <div className="bg-green-500 text-black px-6 py-4 rounded-xl font-bold inline-block">
              🎉 You Won the Lucky Draw!
            </div>
          ) : (
            <div className="bg-red-500 text-black px-6 py-4 rounded-xl font-bold inline-block">
              😢 Better Luck Next Time
            </div>
          )}
        </div>
      )}

      {/* ADD SCORE */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl mb-10 border border-slate-800">
        <h2 className="text-xl font-bold mb-4">Add New Score</h2>

        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Enter score (1-45)"
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

      {/* SCORES LIST */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold mb-6">Your Last 5 Scores</h2>

        {scores.length === 0 ? (
          <p className="text-slate-400">No scores yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((score, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-slate-700 p-4 rounded-xl flex justify-between"
              >
                <span className="text-lg font-bold text-[#2DD4BF]">
                  {score.value}
                </span>
                <span className="text-sm text-slate-400">
                  {new Date(score.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;