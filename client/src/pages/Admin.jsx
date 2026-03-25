import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, Users, List, Play } from "lucide-react";

const Admin = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [selectedUserScores, setSelectedUserScores] = useState([]);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= VIEW USER SCORES =================
  const viewScores = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/scores/admin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedUserScores(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching scores ❌");
    }
  };

  // ================= RUN DRAW =================
  const runDraw = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/draw/run",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Draw completed 🎉");
    } catch (err) {
      console.log(err);
      alert("Draw failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 text-[#2DD4BF] text-xl font-bold">
          <Sparkles />
          Admin Panel
        </div>

        <button
          onClick={runDraw}
          className="bg-[#2DD4BF] text-[#020617] px-5 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <Play size={18} />
          Run Draw 🎲
        </button>
      </div>

      {/* USERS */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800 mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users size={20} /> Users
        </h2>

        {users.length === 0 ? (
          <p className="text-slate-400">No users found</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-[#020617] border border-slate-700 p-4 rounded-xl flex justify-between items-center"
              >
                <span>{user.email}</span>

                <button
                  onClick={() => viewScores(user._id)}
                  className="text-[#2DD4BF] hover:underline flex items-center gap-1"
                >
                  <List size={16} />
                  View Scores
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SCORES */}
      <div className="bg-[#0b1224]/70 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-xl font-bold mb-6">
          📊 User Scores
        </h2>

        {selectedUserScores.length === 0 ? (
          <p className="text-slate-400">
            Click "View Scores" to see data
          </p>
        ) : (
          <div className="space-y-3">
            {selectedUserScores.map((score, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-slate-700 p-4 rounded-xl"
              >
                <p>Score: {score.value}</p>
                <p className="text-sm text-slate-400">
                  {new Date(score.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;