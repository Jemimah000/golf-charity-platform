import React, { useEffect, useState } from "react";
import API from "../services/api"; // ✅ centralized API instance

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [draws, setDraws] = useState([]);

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.log("Fetch Users Error:", err.response?.data || err.message);
    }
  };

  // ================= FETCH DRAWS =================
  const fetchDraws = async () => {
    try {
      const res = await API.get("/draw/all");
      setDraws(res.data);
    } catch (err) {
      console.log("Fetch Draws Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDraws();
  }, []);

  // ================= RUN DRAW =================
  const runDraw = async () => {
    try {
      await API.post("/draw/run");
      alert("Official Draw Completed 🎉");
      fetchDraws();
    } catch (err) {
      console.log("Run Draw Error:", err.response?.data || err.message);
      alert("Draw failed ❌");
    }
  };

  return (
    <div className="p-6 text-white bg-[#020617] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">👑 Admin Panel</h1>

      <button
        onClick={runDraw}
        className="bg-green-500 px-4 py-2 rounded mb-6 hover:scale-105 transition"
      >
        Run Official Draw 🎲
      </button>

      {/* USERS */}
      <h2 className="text-xl mb-3">Users</h2>
      {users.length === 0 ? (
        <p className="text-slate-400">No users found</p>
      ) : (
        users.map((u) => (
          <div key={u._id} className="mb-2 p-2 bg-[#0b1224]/70 rounded">
            {u.email} - Winnings: ₹{u.winnings || 0}
          </div>
        ))
      )}

      {/* DRAWS */}
      <h2 className="text-xl mt-6 mb-3">Draw History</h2>
      {draws.length === 0 ? (
        <p className="text-slate-400">No draws yet</p>
      ) : (
        draws.map((draw) => (
          <div key={draw._id} className="mb-4 border p-3 rounded bg-[#0b1224]/70">
            <p>
              <span className="text-[#2DD4BF] font-bold">Winning Numbers:</span>{" "}
              {draw.winningNumbers.join(", ")}
            </p>

            {draw.winners.length === 0 ? (
              <p>No winners</p>
            ) : (
              draw.winners.map((w, i) => (
                <div key={i} className="ml-2">
                  {w.email} - {w.prize} - {w.isPaid ? "✅ Paid" : "❌ Pending"}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;